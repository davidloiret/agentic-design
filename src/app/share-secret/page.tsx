"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Link, Shield, Clock, Eye, Copy, Check, AlertTriangle, Key, Send, Download, Unlock, Trash2 } from "lucide-react";

type HoddorModule = typeof import("@gatewatcher/hoddor");

export default function ShareSecretPage() {
	const [isReady, setIsReady] = React.useState(false);
	const [initError, setInitError] = React.useState<string | null>(null);
	const [secretText, setSecretText] = React.useState("");
	const [expiryHours, setExpiryHours] = React.useState(24);
	const [maxViews, setMaxViews] = React.useState(1);
	const [isCreating, setIsCreating] = React.useState(false);
	const [shareLink, setShareLink] = React.useState("");
	const [passphrase, setPassphrase] = React.useState("");
	const [copiedLink, setCopiedLink] = React.useState(false);
	const [copiedPassphrase, setCopiedPassphrase] = React.useState(false);
	const [copiedSecret, setCopiedSecret] = React.useState(false);
	const [mode, setMode] = React.useState<"create" | "view">("create");
	const [viewPassphrase, setViewPassphrase] = React.useState("");
	const [decryptedSecret, setDecryptedSecret] = React.useState("");
	const [secretInfo, setSecretInfo] = React.useState<any>(null);
	const [isDecrypting, setIsDecrypting] = React.useState(false);
	const [secretId, setSecretId] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	
	// Size limit: 10MB
	const MAX_SECRET_SIZE = 10 * 1024 * 1024; // 10MB in bytes

	const searchParams = useSearchParams();

	const hoddorRef = React.useRef<HoddorModule | null>(null);

	React.useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				const mod = await import("@gatewatcher/hoddor");
				if (typeof (mod as any).default === "function") {
					await (mod as any).default();
				}
				if (!cancelled) {
					hoddorRef.current = mod as HoddorModule;
					setIsReady(true);
				}
			} catch (err: any) {
				console.error("Failed to init Hoddor", err);
				if (!cancelled) {
					setInitError(err?.message || String(err));
				}
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, []);

	// Check if we're in view mode (URL has id parameter)
	React.useEffect(() => {
		const id = searchParams?.get('id');
		if (id) {
			setSecretId(id);
			setMode("view");
		}
	}, [searchParams]);

	function generateSecurePassword() {
		const lowercase = 'abcdefghijklmnopqrstuvwxyz';
		const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';
		const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
		const allChars = lowercase + uppercase + numbers + symbols;
		
		let password = '';
		password += lowercase[Math.floor(Math.random() * lowercase.length)];
		password += uppercase[Math.floor(Math.random() * uppercase.length)];
		password += numbers[Math.floor(Math.random() * numbers.length)];
		password += symbols[Math.floor(Math.random() * symbols.length)];
		
		for (let i = 4; i < 32; i++) {
			password += allChars[Math.floor(Math.random() * allChars.length)];
		}
		
		return password.split('').sort(() => Math.random() - 0.5).join('');
	}

	function validateSecretSize(text: string): boolean {
		const sizeInBytes = new Blob([text]).size;
		return sizeInBytes <= MAX_SECRET_SIZE;
	}

	function formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	async function createSecret() {
		if (!isReady || !hoddorRef.current || !secretText.trim()) return;
		
		// Validate size limit
		if (!validateSecretSize(secretText)) {
			const currentSize = new Blob([secretText]).size;
			setError(`Secret is too large (${formatFileSize(currentSize)}). Maximum size allowed is ${formatFileSize(MAX_SECRET_SIZE)}.`);
			return;
		}
		
		try {
			setIsCreating(true);
			setError(null);
			
			// Generate unique ID and passphrase
			const secretId = `secret_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			const generatedPassphrase = generateSecurePassword();
			setPassphrase(generatedPassphrase);
			
			// Create vault with the secret
			await hoddorRef.current.create_vault(secretId);
			const identity = await hoddorRef.current.vault_identity_from_passphrase(generatedPassphrase, secretId);
			
			// Store just the secret content as a string - simpler approach
			await hoddorRef.current.upsert_vault(secretId, identity, "secret", secretText, null, true);
			
			// Export vault for server storage
			const vaultData = await hoddorRef.current.export_vault(secretId);
			
			// Store on server
			const response = await fetch('/api/secrets', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: secretId,
					vault: Array.from(vaultData),
					expiresAt: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(),
					maxViews
				})
			});
			
			if (!response.ok) throw new Error('Failed to store secret');
			
			// Create share link (passphrase sent separately)
			const baseUrl = window.location.origin;
			const link = `${baseUrl}/share-secret?id=${secretId}`;
			setShareLink(link);
			
			// Clean up local vault
			await hoddorRef.current.remove_vault(secretId);
			
		} catch (err: any) {
			console.error("Error creating secret:", err);
			setError(`Failed to create secret: ${err?.message || String(err)}`);
		} finally {
			setIsCreating(false);
		}
	}

	async function decryptSecret() {
		if (!isReady || !hoddorRef.current || !secretId || !viewPassphrase.trim()) return;
		
		try {
			setIsDecrypting(true);
			setError(null);
			
			// Fetch the vault from server
			const response = await fetch(`/api/secrets?id=${secretId}`);
			const data = await response.json();
			
			if (!response.ok) {
				throw new Error(data.error || 'Failed to retrieve secret');
			}
			
			setSecretInfo(data);
			
			// Convert array back to Uint8Array
			const vaultData = new Uint8Array(data.vault);
			
			// Import vault temporarily
			const tempVaultName = `temp_${Date.now()}`;
			await hoddorRef.current.import_vault(tempVaultName, vaultData);
			
			// Derive identity and decrypt
			const identity = await hoddorRef.current.vault_identity_from_passphrase(viewPassphrase, tempVaultName);
			const secretData = await hoddorRef.current.read_from_vault(tempVaultName, identity, "secret");
			
			// Clean up temp vault
			await hoddorRef.current.remove_vault(tempVaultName);
			
			// Extract the secret content
			console.log("Raw secret data:", secretData);
			console.log("Secret data type:", typeof secretData);
			
			// Since we're storing just the content string, it should be straightforward
			const content = String(secretData);
			setDecryptedSecret(content);
			
		} catch (err: any) {
			console.error("Error decrypting secret:", err);
			setError(`${err?.message || String(err)}`);
		} finally {
			setIsDecrypting(false);
		}
	}

	async function copyToClipboard(text: string, type: 'link' | 'passphrase' | 'secret') {
		try {
			await navigator.clipboard.writeText(text);
			if (type === 'link') {
				setCopiedLink(true);
				setTimeout(() => setCopiedLink(false), 2000);
			} else if (type === 'passphrase') {
				setCopiedPassphrase(true);
				setTimeout(() => setCopiedPassphrase(false), 2000);
			} else if (type === 'secret') {
				setCopiedSecret(true);
				setTimeout(() => setCopiedSecret(false), 2000);
			}
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
			<div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
				{/* Header */}
				<motion.div 
					className="text-center py-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.h1 
						className="text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-2"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.1 }}
					>
						🔥 Self-Destructing Secrets
					</motion.h1>
					<motion.p 
						className="text-gray-400 text-sm mb-4"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.2 }}
					>
						Share sensitive information that automatically destroys after viewing
					</motion.p>
					<motion.div
						className="flex justify-center"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 }}
					>
						<a
							href="/hoddor"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 transition-all duration-200"
						>
							🔐 Manage Hoddor Vaults
						</a>
					</motion.div>
				</motion.div>

				{initError && (
					<motion.div 
						className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 backdrop-blur-sm"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					>
						Initialization error: {initError}
					</motion.div>
				)}

				{error && (
					<motion.div 
						className="relative p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex items-center justify-between gap-3">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-red-400" />
								<span className="text-red-300">{error}</span>
							</div>
							<button
								onClick={() => setError(null)}
								className="text-red-400 hover:text-red-300 transition-colors"
								title="Dismiss error"
							>
								✕
							</button>
						</div>
					</motion.div>
				)}

				{mode === "view" && !decryptedSecret ? (
					/* View Secret Form */
					<motion.div 
						className="relative group"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
						
						<div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/60 rounded-3xl p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
									<Unlock className="w-6 h-6 text-blue-400" />
								</div>
								<div>
									<h3 className="text-white font-bold text-xl">Decrypt Secret</h3>
									<p className="text-gray-400">Enter the passphrase to reveal the secret</p>
								</div>
							</div>
							
							<div className="space-y-6">
								<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
									<div className="flex items-center gap-2 mb-2">
										<AlertTriangle className="w-5 h-5 text-yellow-400" />
										<span className="text-yellow-300 font-medium">⚠️ Self-Destructing Secret</span>
									</div>
									<p className="text-yellow-200 text-sm">
										This secret will be <strong>permanently destroyed</strong> after viewing. Make sure you're ready to save or use this information before decrypting.
									</p>
								</div>
								
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
										<Key className="w-4 h-4" />
										Passphrase
									</label>
									<input
										type="password"
										placeholder="Enter the passphrase provided separately"
										value={viewPassphrase}
										onChange={(e) => {
											setViewPassphrase(e.target.value);
											if (error) setError(null); // Clear error when user types
										}}
										className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												decryptSecret();
											}
										}}
									/>
								</div>

								<motion.button 
									onClick={decryptSecret} 
									disabled={!isReady || !viewPassphrase.trim() || isDecrypting}
									className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-blue-500/30 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									{isDecrypting ? (
										<>
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											Decrypting Secret...
										</>
									) : (
										<>
											<Unlock className="w-5 h-5" />
											🔓 Decrypt & View Secret
										</>
									)}
								</motion.button>
								
								<div className="text-center">
									<button
										onClick={() => {
											setMode("create");
											setSecretId(null);
											setViewPassphrase("");
											setError(null);
										}}
										className="text-gray-400 hover:text-gray-200 text-sm transition-colors"
									>
										← Create your own secret instead
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				) : mode === "view" && decryptedSecret ? (
					/* Decrypted Secret Display */
					<motion.div 
						className="space-y-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="relative group">
							<div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl opacity-100 transition-opacity duration-500 blur-xl" />
							
							<div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8">
								<div className="flex items-center gap-3 mb-6">
									<div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
										<Check className="w-6 h-6 text-green-400" />
									</div>
									<div>
										<h3 className="text-white font-bold text-xl">Secret Revealed</h3>
										{secretInfo?.isLastView && (
											<p className="text-red-400 text-sm">🔥 This secret has been permanently destroyed</p>
										)}
									</div>
								</div>
								
								<div className="space-y-6">
									{secretInfo?.isLastView && (
										<div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
											<div className="flex items-center gap-2 mb-2">
												<Trash2 className="w-5 h-5 text-red-400" />
												<span className="text-red-300 font-medium">Secret Self-Destructed</span>
											</div>
											<p className="text-red-200 text-sm">
												This was the final view. The secret has been permanently deleted from the server and cannot be recovered.
											</p>
										</div>
									)}
									
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<label className="text-sm font-medium text-gray-300">Secret Content</label>
											<motion.button
												onClick={() => copyToClipboard(decryptedSecret, 'secret')}
												className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 transition-all duration-200"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												{copiedSecret ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
												{copiedSecret ? "Copied!" : "Copy"}
											</motion.button>
										</div>
										<div className="bg-gray-900/40 border border-gray-700/40 rounded-xl p-4">
											<pre className="whitespace-pre-wrap break-all text-sm text-gray-100 font-mono leading-relaxed">
												{decryptedSecret}
											</pre>
										</div>
									</div>
									
									{secretInfo && (
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="bg-gray-800/40 rounded-lg p-3">
												<span className="text-gray-400">Views:</span>
												<span className="text-white ml-2">{secretInfo.viewCount} / {secretInfo.maxViews}</span>
											</div>
											<div className="bg-gray-800/40 rounded-lg p-3">
												<span className="text-gray-400">Expires:</span>
												<span className="text-white ml-2">{new Date(secretInfo.expiresAt).toLocaleString()}</span>
											</div>
										</div>
									)}
									
									<div className="flex gap-4">
										<motion.button
											onClick={() => {
												setMode("create");
												setSecretId(null);
												setViewPassphrase("");
												setDecryptedSecret("");
												setSecretInfo(null);
												setCopiedSecret(false);
												setError(null);
											}}
											className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 rounded-xl transition-all duration-200"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.95 }}
										>
											Create Your Own Secret
										</motion.button>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				) : !shareLink ? (
					/* Create Secret Form */
					<motion.div 
						className="relative group"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
						
						<div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/60 rounded-3xl p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-3 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
									<Shield className="w-6 h-6 text-red-400" />
								</div>
								<div>
									<h3 className="text-white font-bold text-xl">Create Secret</h3>
									<p className="text-gray-400 text-sm">Maximum size: {formatFileSize(MAX_SECRET_SIZE)}</p>
								</div>
							</div>
							
							<div className="space-y-6">
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label className="text-sm font-medium text-gray-300">Secret Content</label>
										<div className="text-xs text-gray-400">
											{(() => {
												const currentSize = new Blob([secretText]).size;
												const percentage = (currentSize / MAX_SECRET_SIZE) * 100;
												const isNearLimit = percentage > 80;
												const isOverLimit = percentage > 100;
												
												return (
													<span className={`transition-colors duration-200 ${
														isOverLimit ? 'text-red-400' : 
														isNearLimit ? 'text-yellow-400' : 
														'text-gray-400'
													}`}>
														{formatFileSize(currentSize)} / {formatFileSize(MAX_SECRET_SIZE)}
														{percentage > 0 && (
															<span className="ml-1">
														({percentage.toFixed(1)}%)
													</span>
														)}
													</span>
												);
											})()}
										</div>
									</div>
									<textarea
										placeholder="Enter your sensitive information here..."
										value={secretText}
										onChange={(e) => {
											setSecretText(e.target.value);
											if (error) setError(null); // Clear error when user types
										}}
										rows={6}
										className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
									/>
									{(() => {
										const currentSize = new Blob([secretText]).size;
										const percentage = (currentSize / MAX_SECRET_SIZE) * 100;
										
										if (percentage > 0) {
											return (
												<div className="space-y-1">
													<div className="w-full bg-gray-700/50 rounded-full h-1.5">
														<div 
															className={`h-1.5 rounded-full transition-all duration-300 ${
																percentage > 100 ? 'bg-red-500' :
																percentage > 80 ? 'bg-yellow-500' :
																'bg-green-500'
															}`}
															style={{ width: `${Math.min(percentage, 100)}%` }}
														/>
													</div>
													{percentage > 90 && (
														<p className={`text-xs ${
															percentage > 100 ? 'text-red-400' : 'text-yellow-400'
														}`}>
															{percentage > 100 ? 
																'⚠️ Content exceeds size limit' : 
																'⚠️ Approaching size limit'
															}
														</p>
													)}
												</div>
											);
										}
										return null;
									})()}
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
											<Clock className="w-4 h-4" />
											Expires After (hours)
										</label>
										<select
											value={expiryHours}
											onChange={(e) => setExpiryHours(Number(e.target.value))}
											className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
										>
											<option value={1}>1 hour</option>
											<option value={6}>6 hours</option>
											<option value={24}>24 hours</option>
											<option value={72}>3 days</option>
											<option value={168}>1 week</option>
										</select>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
											<Eye className="w-4 h-4" />
											Max Views
										</label>
										<select
											value={maxViews}
											onChange={(e) => setMaxViews(Number(e.target.value))}
											className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
										>
											<option value={1}>1 view (destroy after reading)</option>
											<option value={3}>3 views</option>
											<option value={5}>5 views</option>
											<option value={10}>10 views</option>
										</select>
									</div>
								</div>

								<motion.button 
									onClick={createSecret} 
									disabled={!isReady || !secretText.trim() || isCreating || !validateSecretSize(secretText)}
									className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-red-600 to-orange-600 text-white border border-red-500/30 hover:from-red-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-red-500/25"
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									{isCreating ? (
										<>
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											Creating Secure Link...
										</>
									) : (
										<>
											<Send className="w-5 h-5" />
											Create Self-Destructing Secret
										</>
									)}
								</motion.button>
							</div>
						</div>
					</motion.div>
				) : (
					/* Share Links */
					<motion.div 
						className="space-y-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="relative group">
							<div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl opacity-100 transition-opacity duration-500 blur-xl" />
							
							<div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8">
								<div className="flex items-center gap-3 mb-6">
									<div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
										<Check className="w-6 h-6 text-green-400" />
									</div>
									<h3 className="text-white font-bold text-xl">Secret Created Successfully!</h3>
								</div>
								
								<div className="space-y-6">
									<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
										<div className="flex items-center gap-2 mb-2">
											<AlertTriangle className="w-5 h-5 text-yellow-400" />
											<span className="text-yellow-300 font-medium">Important Security Instructions</span>
										</div>
										<p className="text-yellow-200 text-sm">
											Send the link and passphrase through <strong>separate channels</strong> (e.g., link via email, passphrase via SMS or Signal). 
											This ensures even if one channel is compromised, your secret remains secure.
										</p>
									</div>
									
									<div className="space-y-4">
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
												<Link className="w-4 h-4" />
												Share Link (send this first)
											</label>
											<div className="flex gap-2">
												<input
													type="text"
													value={shareLink}
													readOnly
													className="flex-1 px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
												/>
												<motion.button
													onClick={() => copyToClipboard(shareLink, 'link')}
													className="px-4 py-3 bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 rounded-xl transition-all duration-200"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													{copiedLink ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
												</motion.button>
											</div>
										</div>
										
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
												<Key className="w-4 h-4" />
												Passphrase (send this separately)
											</label>
											<div className="flex gap-2">
												<input
													type="text"
													value={passphrase}
													readOnly
													className="flex-1 px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
												/>
												<motion.button
													onClick={() => copyToClipboard(passphrase, 'passphrase')}
													className="px-4 py-3 bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 rounded-xl transition-all duration-200"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													{copiedPassphrase ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
												</motion.button>
											</div>
										</div>
									</div>
									
									<div className="flex gap-4">
										<motion.button
											onClick={() => {
												setShareLink("");
												setPassphrase("");
												setSecretText("");
												setCopiedLink(false);
												setCopiedPassphrase(false);
												setCopiedSecret(false);
												setError(null);
											}}
											className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 rounded-xl transition-all duration-200"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.95 }}
										>
											Create Another Secret
										</motion.button>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}

				{/* Footer */}
				<motion.div 
					className="text-center py-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.8 }}
				>
					<div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm border border-gray-700/40 rounded-2xl">
						<div className="flex items-start gap-3 text-left">
							<div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 mt-1">
								<Shield className="w-5 h-5 text-red-400" />
							</div>
							<div>
								<h4 className="font-semibold text-red-400 mb-2">Self-Destructing Security</h4>
								<p className="text-gray-300 text-sm leading-relaxed">
									Secrets are encrypted with Hoddor, stored temporarily on the server, and automatically destroyed after expiration or max views. 
									Only the recipient with both the link and passphrase can decrypt the content.
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}