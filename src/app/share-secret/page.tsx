"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Link, Shield, Clock, Eye, Copy, Check, AlertTriangle, Key, Send, Download, Unlock, Trash2, FileText, Upload, File, X, FileArchive } from "lucide-react";

type HoddorModule = typeof import("@gatewatcher/hoddor");

function ShareSecretContent() {
	const [isReady, setIsReady] = React.useState(false);
	const [initError, setInitError] = React.useState<string | null>(null);
	const [secretText, setSecretText] = React.useState("");
	const [expiryHours, setExpiryHours] = React.useState(24);
	const [maxViews, setMaxViews] = React.useState(1);
	const [isCreating, setIsCreating] = React.useState(false);
	const [creationProgress, setCreationProgress] = React.useState<{
		currentStep: string;
		technicalStep?: string;
		fileIndex?: number;
		totalFiles?: number;
		progress: number;
	}>({
		currentStep: '',
		progress: 0
	});
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
	const [secretType, setSecretType] = React.useState<"text" | "file">("text");
	const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
	const [decryptedFiles, setDecryptedFiles] = React.useState<{ name: string; data: Uint8Array; type: string; size: number }[]>([]);
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	
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

	async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(event.target.files || []);
		if (!files.length) return;

		// Calculate total size including existing files
		const existingSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
		const newFilesSize = files.reduce((sum, file) => sum + file.size, 0);
		const totalSize = existingSize + newFilesSize;

		if (totalSize > MAX_SECRET_SIZE) {
			setError(`Total size would exceed limit (${formatFileSize(totalSize)} / ${formatFileSize(MAX_SECRET_SIZE)}). Please remove some files or select smaller ones.`);
			return;
		}

		setSelectedFiles([...selectedFiles, ...files]);
		setError(null);
		
		// Reset the input so the same file can be selected again if removed
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}

	function removeFile(index: number) {
		setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
		setError(null);
	}

	function getTotalFileSize(): number {
		return selectedFiles.reduce((sum, file) => sum + file.size, 0);
	}

	async function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = () => resolve(reader.result as ArrayBuffer);
			reader.onerror = error => reject(error);
		});
	}

	async function createSecret() {
		if (!isReady || !hoddorRef.current) return;
		
		// Validate inputs based on type
		if (secretType === "text" && !secretText.trim()) {
			setError("Please enter some text to encrypt");
			return;
		}
		if (secretType === "file" && selectedFiles.length === 0) {
			setError("Please select at least one file to encrypt");
			return;
		}
		
		// Validate size limit for text
		if (secretType === "text" && !validateSecretSize(secretText)) {
			const currentSize = new Blob([secretText]).size;
			setError(`Secret is too large (${formatFileSize(currentSize)}). Maximum size allowed is ${formatFileSize(MAX_SECRET_SIZE)}.`);
			return;
		}
		
		try {
			setIsCreating(true);
			setError(null);
			setCreationProgress({ currentStep: '🔮 Initializing Hoddor magic...', technicalStep: 'Initializing encryption', progress: 5 });
			
			// Generate unique ID and passphrase
			const secretId = `secret_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			const generatedPassphrase = generateSecurePassword();
			setPassphrase(generatedPassphrase);
			
			setCreationProgress({ currentStep: '🏗️ Vaulting up your fortress...', technicalStep: 'Creating secure vault', progress: 10 });
			
			// Create vault with the secret
			await hoddorRef.current.create_vault(secretId);
			const identity = await hoddorRef.current.vault_identity_from_passphrase(generatedPassphrase, secretId);
			
			setCreationProgress({ currentStep: '🧪 Hoddoring your precious data...', technicalStep: 'Preparing data for encryption', progress: 20 });
			
			// Store data based on type
			if (secretType === "text") {
				setCreationProgress({ currentStep: '🔥 Vaulting your secret words...', technicalStep: 'Encrypting text content', progress: 40 });
				await hoddorRef.current.upsert_vault(secretId, identity, "secret", secretText, null, true);
				await hoddorRef.current.upsert_vault(secretId, identity, "type", "text", null, true);
				setCreationProgress({ currentStep: '✨ Successfully Hoddored!', technicalStep: 'Text encryption complete', progress: 60 });
			} else {
				// For files, store multiple files data and metadata
				setCreationProgress({ 
					currentStep: '📦 Preparing vault chambers...', technicalStep: 'Setting up file encryption', 
					progress: 30,
					totalFiles: selectedFiles.length 
				});
				
				await hoddorRef.current.upsert_vault(secretId, identity, "type", "files", null, true);
				await hoddorRef.current.upsert_vault(secretId, identity, "fileCount", selectedFiles.length.toString(), null, true);
				
				// Store each file following playground pattern
				for (let i = 0; i < selectedFiles.length; i++) {
					const file = selectedFiles[i];
					const fileProgress = Math.round(30 + (i / selectedFiles.length) * 40); // 30-70% for file processing
					
					setCreationProgress({
						currentStep: `🔧 Hoddoring file ${i + 1}/${selectedFiles.length}...`, technicalStep: `Processing ${file.name}`,
						fileIndex: i + 1,
						totalFiles: selectedFiles.length,
						progress: fileProgress
					});
					
					console.log(`Creating secret - Processing file ${i}: ${file.name}, size: ${file.size} bytes`);
					
					const fileData = await fileToArrayBuffer(file);
					console.log(`File converted to ArrayBuffer, size: ${fileData.byteLength} bytes`);
					
					if (fileData.byteLength === 0) {
						console.error("WARNING: File ArrayBuffer is empty!");
						throw new Error(`File ${file.name} has no data`);
					}
					
					setCreationProgress({
						currentStep: `🌪️ Vaulting the secrets...`, technicalStep: `Encrypting ${file.name}`,
						fileIndex: i + 1,
						totalFiles: selectedFiles.length,
						progress: fileProgress + 2
					});
					
					// Convert to array of numbers like playground does
					const uint8Array = new Uint8Array(fileData);
					const dataArray = Array.from(uint8Array);
					console.log(`File converted to array, length: ${dataArray.length}`);
					
					await hoddorRef.current.upsert_vault(secretId, identity, `file_${i}_data`, dataArray, null, true);
					await hoddorRef.current.upsert_vault(secretId, identity, `file_${i}_name`, file.name, null, true);
					await hoddorRef.current.upsert_vault(secretId, identity, `file_${i}_type`, file.type || "application/octet-stream", null, true);
					await hoddorRef.current.upsert_vault(secretId, identity, `file_${i}_size`, file.size.toString(), null, true);
					
					console.log(`File ${i} stored successfully in vault`);
				}
				
				setCreationProgress({ 
					currentStep: '🎉 All secrets safely Hoddored!', technicalStep: 'All files encrypted successfully', 
					progress: 70,
					totalFiles: selectedFiles.length 
				});
			}
			
			// Export vault for server storage
			setCreationProgress({ currentStep: '📋 Sealing the vault doors...', technicalStep: 'Preparing vault for storage', progress: 75 });
			const vaultData = await hoddorRef.current.export_vault(secretId);
			
			// Store on server via NestJS backend
			setCreationProgress({ currentStep: '🚀 Transmitting to Hoddor realm...', technicalStep: 'Uploading to secure server', progress: 85 });
			const response = await fetch('/api/v1/secrets', {
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
			
			setCreationProgress({ currentStep: '🔗 Forging vault access key...', technicalStep: 'Generating share link', progress: 95 });
			
			// Create share link (passphrase sent separately)
			const baseUrl = window.location.origin;
			const link = `${baseUrl}/share-secret?id=${secretId}`;
			setShareLink(link);
			
			// Clean up local vault
			setCreationProgress({ currentStep: '🎊 Hoddor magic complete!', technicalStep: 'Completing setup', progress: 100 });
			await hoddorRef.current.remove_vault(secretId);
			
		} catch (err: any) {
			console.error("Error creating secret:", err);
			setError(`Failed to create secret: ${err?.message || String(err)}`);
		} finally {
			setIsCreating(false);
			setCreationProgress({ currentStep: '', progress: 0 });
		}
	}

	async function decryptSecret() {
		if (!isReady || !hoddorRef.current || !secretId || !viewPassphrase.trim()) return;
		
		let tempVaultName: string | null = null;
		
		try {
			setIsDecrypting(true);
			setError(null);
			
			console.log("Starting decryption process for secret:", secretId);
			
			// Fetch the vault from server via NestJS backend
			const response = await fetch(`/api/v1/secrets?id=${secretId}`);
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ error: 'Unknown server error' }));
				throw new Error(errorData.error || `Server error: ${response.status}`);
			}
			
			const data = await response.json();
			console.log("Vault data retrieved, size:", data.vault?.length);
			setSecretInfo(data);
			
			if (!data.vault || !Array.isArray(data.vault)) {
				throw new Error("Invalid vault data received from server");
			}
			
			// Convert array back to Uint8Array
			const vaultData = new Uint8Array(data.vault);
			console.log("Vault data converted to Uint8Array, size:", vaultData.length);
			
			// Import vault temporarily
			tempVaultName = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			console.log("Importing vault as:", tempVaultName);
			await hoddorRef.current.import_vault(tempVaultName, vaultData);
			console.log("Vault imported successfully");
			
			// Derive identity and decrypt
			console.log("Deriving identity from passphrase");
			const identity = await hoddorRef.current.vault_identity_from_passphrase(viewPassphrase, tempVaultName);
			console.log("Identity derived successfully");
			
			// Read the type first
			console.log("Reading secret type");
			const secretType = await hoddorRef.current.read_from_vault(tempVaultName, identity, "type");
			console.log("Secret type:", secretType);
			
			if (secretType === "files") {
				// For multiple files
				console.log("Processing multiple files");
				const fileCount = parseInt(await hoddorRef.current.read_from_vault(tempVaultName, identity, "fileCount"));
				console.log("File count:", fileCount);
				const files: { name: string; data: Uint8Array; type: string; size: number }[] = [];
				
				for (let i = 0; i < fileCount; i++) {
					console.log(`Processing file ${i + 1}/${fileCount}`);
					const fileData = await hoddorRef.current.read_from_vault(tempVaultName, identity, `file_${i}_data`);
					const fileName = await hoddorRef.current.read_from_vault(tempVaultName, identity, `file_${i}_name`);
					const fileType = await hoddorRef.current.read_from_vault(tempVaultName, identity, `file_${i}_type`);
					
					console.log(`File ${i} raw data:`, fileData);
					console.log(`File ${i} - Name: ${fileName}, Type: ${fileType}, Data type: ${typeof fileData}, Is Array: ${Array.isArray(fileData)}, Length: ${fileData?.length || 'unknown'}`);
					
					// Debug: Check what we actually got
					if (fileData && fileData.length > 0) {
						console.log(`First 10 bytes of file data:`, fileData.slice(0, 10));
					}
					
					// Convert array of numbers back to Uint8Array (playground pattern)
					const uint8Array = new Uint8Array(fileData);
					console.log(`File data converted back to Uint8Array, size: ${uint8Array.length} bytes`);
					console.log(`First 10 bytes of Uint8Array:`, Array.from(uint8Array.slice(0, 10)));
					
					files.push({
						name: String(fileName),
						data: uint8Array,
						type: String(fileType),
						size: uint8Array.length
					});
				}
				
				setDecryptedFiles(files);
				console.log("Files decrypted successfully:", files.length);
				console.log("Files data:", files);
			} else if (secretType === "file") {
				// Legacy single file support
				console.log("Processing legacy single file");
				const secretData = await hoddorRef.current.read_from_vault(tempVaultName, identity, "secret");
				const filename = await hoddorRef.current.read_from_vault(tempVaultName, identity, "filename");
				const mimetype = await hoddorRef.current.read_from_vault(tempVaultName, identity, "mimetype");
				
				// Convert array of numbers back to Uint8Array (playground pattern)
				const uint8Array = new Uint8Array(secretData);
				console.log(`Legacy file data converted, size: ${uint8Array.length} bytes`);
				
				setDecryptedFiles([{
					name: String(filename),
					data: uint8Array,
					type: String(mimetype),
					size: uint8Array.length
				}]);
				console.log("Legacy file decrypted successfully");
			} else {
				// For text
				console.log("Processing text secret");
				const secretData = await hoddorRef.current.read_from_vault(tempVaultName, identity, "secret");
				setDecryptedSecret(String(secretData));
				console.log("Text secret decrypted successfully");
			}
			
		} catch (err: any) {
			console.error("Error decrypting secret:", err);
			let errorMessage = "Failed to decrypt secret";
			
			if (err?.message?.includes("passphrase") || err?.message?.includes("identity") || err?.message?.includes("decrypt")) {
				errorMessage = "Invalid passphrase. Please check and try again.";
			} else if (err?.message?.includes("vault") || err?.message?.includes("import")) {
				errorMessage = "Unable to access secret. It may have expired or been corrupted.";
			} else if (err?.message?.includes("server") || err?.message?.includes("fetch")) {
				errorMessage = "Unable to retrieve secret from server. Please check your connection.";
			} else if (err?.message) {
				errorMessage = err.message;
			}
			
			setError(errorMessage);
		} finally {
			// Clean up temp vault if it was created
			if (tempVaultName && hoddorRef.current) {
				try {
					console.log("Cleaning up temporary vault:", tempVaultName);
					await hoddorRef.current.remove_vault(tempVaultName);
					console.log("Temporary vault cleaned up successfully");
				} catch (cleanupErr) {
					console.warn("Error during vault cleanup:", cleanupErr);
				}
			}
			setIsDecrypting(false);
		}
	}

	function downloadFile(file: { name: string; data: Uint8Array; type: string; size: number }) {
		try {
			console.log("Starting download for:", file.name, "Size:", file.size, "bytes");
			
			// Create blob directly from data as received from vault
			const blob = new Blob([file.data], { type: file.type });
			console.log("Blob created, size:", blob.size, "type:", blob.type);
			
			if (blob.size === 0) {
				console.error("Blob is empty! Original data size was:", file.size);
				return;
			}
			
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = file.name;
			link.style.display = 'none';
			
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			
			// Clean up the object URL after a short delay
			setTimeout(() => URL.revokeObjectURL(url), 1000);
			console.log("Download completed for:", file.name);
			
		} catch (err) {
			console.error("Error in downloadFile:", err);
		}
	}

	function downloadAllFiles() {
		decryptedFiles.forEach((file, index) => {
			setTimeout(() => downloadFile(file), index * 100); // Stagger downloads
		});
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

	// Debug logging for render conditions - temporarily disabled to prevent Fast Refresh
	// console.log("Render debug - mode:", mode, "decryptedSecret:", !!decryptedSecret, "decryptedFiles.length:", decryptedFiles.length, "shareLink:", !!shareLink);
	// console.log("Should show decrypted view?", mode === "view" && (decryptedSecret || decryptedFiles.length > 0));
	// console.log("Decrypted files:", decryptedFiles);

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

				{mode === "view" && !decryptedSecret && decryptedFiles.length === 0 ? (
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
											setDecryptedSecret("");
											setDecryptedFiles([]);
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
				) : mode === "view" && (decryptedSecret || decryptedFiles.length > 0) ? (
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
									
									{decryptedFiles.length > 0 ? (
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<label className="text-sm font-medium text-gray-300">
													Encrypted File{decryptedFiles.length > 1 ? 's' : ''} ({decryptedFiles.length})
												</label>
												{decryptedFiles.length > 1 && (
													<motion.button
														onClick={downloadAllFiles}
														className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 transition-all duration-200"
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
													>
														<Download className="w-4 h-4" />
														Download All
													</motion.button>
												)}
											</div>
											<div className="space-y-2 max-h-64 overflow-y-auto pr-2">
												{decryptedFiles.map((file, index) => (
													<motion.div
														key={`${file.name}-${index}`}
														initial={{ opacity: 0, y: 10 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: index * 0.05 }}
														className="bg-gray-900/40 border border-gray-700/40 rounded-xl p-4"
													>
														<div className="flex items-center justify-between gap-4">
															<div className="flex items-center gap-3 min-w-0">
																<File className="w-10 h-10 text-green-400 flex-shrink-0" />
																<div className="min-w-0">
																	<p className="text-white font-medium truncate">{file.name}</p>
																	<p className="text-gray-400 text-sm">
																		{(() => {
																			console.log(`Displaying file: ${file.name}, size: ${file.size}, data length: ${file.data?.length}`);
																			return `${formatFileSize(file.size)} • Ready for download`;
																		})()}
																	</p>
																</div>
															</div>
															<motion.button
																onClick={() => {
																	console.log("Download button clicked for file:", file.name);
																	downloadFile(file);
																}}
																className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 transition-all duration-200 flex-shrink-0"
																whileHover={{ scale: 1.05 }}
																whileTap={{ scale: 0.95 }}
															>
																<Download className="w-4 h-4" />
																Download
															</motion.button>
														</div>
													</motion.div>
												))}
											</div>
										</div>
									) : (
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
									)}
									
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
												setDecryptedFiles([]);
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
								{/* Secret Type Toggle */}
								<div className="flex gap-2 p-1 bg-gray-800/50 rounded-xl border border-gray-700">
									<button
										onClick={() => {
											setSecretType("text");
											setSelectedFiles([]);
											if (fileInputRef.current) fileInputRef.current.value = '';
										}}
										className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
											secretType === "text" 
												? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg" 
												: "text-gray-400 hover:text-gray-300"
										}`}
									>
										<FileText className="w-4 h-4" />
										Text
									</button>
									<button
										onClick={() => {
											setSecretType("file");
											setSecretText("");
										}}
										className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
											secretType === "file" 
												? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg" 
												: "text-gray-400 hover:text-gray-300"
										}`}
									>
										<File className="w-4 h-4" />
										File
									</button>
								</div>
								{/* Content Input Area */}
								{secretType === "text" ? (
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
												if (error) setError(null);
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
								) : (
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<label className="text-sm font-medium text-gray-300">Select Files</label>
											<div className="text-xs text-gray-400">
												{formatFileSize(getTotalFileSize())} / {formatFileSize(MAX_SECRET_SIZE)}
												{getTotalFileSize() > 0 && (
													<span className="ml-1">
														({((getTotalFileSize() / MAX_SECRET_SIZE) * 100).toFixed(1)}%)
													</span>
												)}
											</div>
										</div>
										<input
											ref={fileInputRef}
											type="file"
											onChange={handleFileSelect}
											multiple
											className="hidden"
											accept="*/*"
										/>
										<div
											onClick={() => fileInputRef.current?.click()}
											onDragOver={(e) => {
												e.preventDefault();
												e.currentTarget.classList.add('border-red-400', 'bg-gray-800/80');
											}}
											onDragLeave={(e) => {
												e.preventDefault();
												e.currentTarget.classList.remove('border-red-400', 'bg-gray-800/80');
											}}
											onDrop={(e) => {
												e.preventDefault();
												e.currentTarget.classList.remove('border-red-400', 'bg-gray-800/80');
												
												const files = Array.from(e.dataTransfer.files);
												const existingSize = getTotalFileSize();
												const newFilesSize = files.reduce((sum, file) => sum + file.size, 0);
												const totalSize = existingSize + newFilesSize;
												
												if (totalSize > MAX_SECRET_SIZE) {
													setError(`Total size would exceed limit (${formatFileSize(totalSize)} / ${formatFileSize(MAX_SECRET_SIZE)}). Please remove some files or select smaller ones.`);
													return;
												}
												
												setSelectedFiles([...selectedFiles, ...files]);
												setError(null);
											}}
											className="w-full min-h-[120px] px-6 py-6 bg-gray-900/60 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-red-500 hover:bg-gray-900/80 transition-all duration-200 cursor-pointer"
										>
											<div className="flex flex-col items-center gap-3">
												<Upload className="w-10 h-10 text-gray-500" />
												<div className="text-center">
													<p className="font-medium">Drop files here or click to browse</p>
													<p className="text-sm text-gray-500">You can select multiple files</p>
												</div>
											</div>
										</div>
										
										{/* File List */}
										{selectedFiles.length > 0 && (
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<p className="text-sm font-medium text-gray-300">
														{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
													</p>
													{selectedFiles.length > 1 && (
														<button
															onClick={() => {
																setSelectedFiles([]);
																if (fileInputRef.current) fileInputRef.current.value = '';
															}}
															className="text-xs text-red-400 hover:text-red-300 transition-colors"
														>
															Remove all
														</button>
													)}
												</div>
												<div className="max-h-48 overflow-y-auto space-y-2 pr-2">
													{selectedFiles.map((file, index) => (
														<motion.div
															key={`${file.name}-${index}`}
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ duration: 0.2, delay: index * 0.05 }}
															className="flex items-center justify-between gap-3 p-3 bg-gray-800/40 rounded-lg border border-gray-700/50"
														>
															<div className="flex items-center gap-3 flex-1 min-w-0">
																<File className="w-4 h-4 text-gray-400 flex-shrink-0" />
																<div className="min-w-0 flex-1">
																	<p className="text-sm text-gray-200 truncate">{file.name}</p>
																	<p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
																</div>
															</div>
															<button
																onClick={() => removeFile(index)}
																className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors flex-shrink-0"
																title="Remove file"
															>
																<X className="w-4 h-4 text-gray-400 hover:text-red-400" />
															</button>
														</motion.div>
													))}
												</div>
												{/* {getTotalFileSize() > 0 && (
													<div className="mt-2">
														<div className="w-full bg-gray-700/50 rounded-full h-1.5">
															<div 
																className={`h-1.5 rounded-full transition-all duration-300 ${
																	(getTotalFileSize() / MAX_SECRET_SIZE) * 100 > 90 ? 'bg-yellow-500' :
																	'bg-green-500'
																}`}
																style={{ width: `${Math.min((getTotalFileSize() / MAX_SECRET_SIZE) * 100, 100)}%` }}
															/>
														</div>
													</div>
												)} */}
											</div>
										)}
									</div>
								)}
								
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

								{/* Progress indicator when creating */}
								{isCreating && creationProgress.progress > 0 && (
									<div className="space-y-3 mb-4">
										<div className="flex items-center justify-between text-sm">
											<div className="flex-1">
												{creationProgress.technicalStep && (
													<div className="text-gray-300">{creationProgress.technicalStep}</div>
												)}
											</div>
											<span className="text-gray-400 ml-4">{creationProgress.progress}%</span>
										</div>
										
										{/* Progress bar */}
										<div className="w-full bg-gray-700/50 rounded-full h-2">
											<div 
												className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
												style={{ width: `${creationProgress.progress}%` }}
											/>
										</div>
										
										{/* File specific progress */}
										{creationProgress.totalFiles && creationProgress.totalFiles > 1 && (
											<div className="text-xs text-gray-400 text-right">
												<span>File {creationProgress.fileIndex} of {creationProgress.totalFiles}</span>
											</div>
										)}
									</div>
								)}

								<motion.button 
									onClick={createSecret} 
									disabled={!isReady || (secretType === "text" ? (!secretText.trim() || !validateSecretSize(secretText)) : selectedFiles.length === 0) || isCreating}
									className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-red-600 to-orange-600 text-white border border-red-500/30 hover:from-red-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-red-500/25"
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									{isCreating ? (
										<>
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											{creationProgress.currentStep || '🔮 Hoddoring your secrets...'}
										</>
									) : (
										<>
											<Send className="w-5 h-5" />
											{secretType === "text" ? "Create Self-Destructing Secret" : 
												selectedFiles.length === 0 ? "Select Files to Encrypt" :
												selectedFiles.length === 1 ? "Encrypt & Share File" :
												`Encrypt & Share ${selectedFiles.length} Files`}
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
												setSelectedFiles([]);
												setSecretType("text");
												if (fileInputRef.current) fileInputRef.current.value = '';
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
								<p className="text-gray-300 text-sm leading-relaxed mb-3">
									Your data is encrypted in the browser using <a href="https://github.com/Gatewatcher/Hoddor" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Hoddor</a> before upload. 
									The server never sees your unencrypted content - only encrypted data is stored temporarily and automatically destroyed after expiration or max views.
								</p>
								<p className="text-gray-400 text-xs leading-relaxed">
									<strong>Zero-Knowledge Architecture:</strong> Without the passphrase (generated locally and sent separately), your secrets remain completely inaccessible - even to us.
									Only you and the recipient with both the link and passphrase can decrypt the content.
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export default function ShareSecretPage() {
	return (
		<Suspense fallback={
			<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center">
				<div className="text-center">
					<div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
					<p className="text-gray-400">Loading...</p>
				</div>
			</div>
		}>
			<ShareSecretContent />
		</Suspense>
	);
}