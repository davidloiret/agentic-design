"use client";

import React from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { BrainMascot } from "@/components/BrainMascot";
import { Key, Lock, Unlock, UploadCloud, Download, Shield, FolderOpen, PlusCircle, Copy, Check, Trash2, AlertTriangle, Dices, Eye, EyeOff } from "lucide-react";

type HoddorModule = typeof import("@gatewatcher/hoddor");

export default function HoddorPage() {
	const [isReady, setIsReady] = React.useState(false);
	const [initError, setInitError] = React.useState<string | null>(null);
	const [passphrase, setPassphrase] = React.useState("");
	const [vaultName, setVaultName] = React.useState("");
	const [status, setStatus] = React.useState<string>("");
	const [namespaces, setNamespaces] = React.useState<string[]>([]);
	const [secrets, setSecrets] = React.useState<Record<string, unknown>>({});
	const [newNamespace, setNewNamespace] = React.useState("");
	const [newSecret, setNewSecret] = React.useState("");
	const [replaceExisting, setReplaceExisting] = React.useState(true);
	const [activeTab, setActiveTab] = React.useState<"open" | "create">("open");
	const [showPasswordDialog, setShowPasswordDialog] = React.useState(false);
	const [pendingFile, setPendingFile] = React.useState<File | null>(null);
	const [copiedSecret, setCopiedSecret] = React.useState<string | null>(null);
	const [editingSecret, setEditingSecret] = React.useState<string | null>(null);
	const [formErrors, setFormErrors] = React.useState<{namespace?: string; secret?: string}>({});
	const [availableVaults, setAvailableVaults] = React.useState<string[]>([]);
	const [isCreatingNewVault, setIsCreatingNewVault] = React.useState(false);
	const [customVaultName, setCustomVaultName] = React.useState("");
	const [deleteConfirmation, setDeleteConfirmation] = React.useState<{show: boolean; secretName: string} | null>(null);
	const [showPassword, setShowPassword] = React.useState(false);
	const [generatedPasswordCopied, setGeneratedPasswordCopied] = React.useState(false);
	const [showGenerationStatus, setShowGenerationStatus] = React.useState(false);
	const [isDragging, setIsDragging] = React.useState(false);
	const [dragCounter, setDragCounter] = React.useState(0);

	const hoddorRef = React.useRef<HoddorModule | null>(null);
	const identityRef = React.useRef<any | null>(null);

	React.useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				// Dynamic import to avoid SSR and initialize WASM
				const mod = await import("@gatewatcher/hoddor");
				// The default export is the init function; call it without args so it resolves the wasm asset.
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

	// Load available vaults when hoddor is ready
	React.useEffect(() => {
		async function loadAvailableVaults() {
			if (isReady && hoddorRef.current) {
				try {
					const vaults: any = await hoddorRef.current.list_vaults();
					if (Array.isArray(vaults)) {
						setAvailableVaults(vaults);
						// If no vaults exist, default to creating new
						if (vaults.length === 0) {
							setIsCreatingNewVault(true);
							setVaultName("");
						} else if (!vaultName && vaults.length > 0) {
							// Default to first available vault
							setVaultName(vaults[0]);
						}
					}
				} catch (err: any) {
					console.log("Failed to load vaults:", err);
					// Don't auto-initialize storage with dummy vaults
					console.log("No vaults found, storage may need initialization when user creates first vault");
					setAvailableVaults([]);
					setIsCreatingNewVault(true);
				}
			}
		}
		loadAvailableVaults();
	}, [isReady]);

	// Auto-load vault contents when switching to Create Vault tab if vault exists
	React.useEffect(() => {
		async function loadExistingVault() {
			if (activeTab === "create" && isReady && vaultName && passphrase && identityRef.current) {
				try {
					// Check if vault exists and load its contents
					const vaults: any = await hoddorRef.current?.list_vaults();
					if (Array.isArray(vaults) && vaults.includes(vaultName)) {
						await handleReadAll();
					}
				} catch (err) {
					console.log("No existing vault or failed to load:", err);
				}
			}
		}
		loadExistingVault();
	}, [activeTab, isReady, vaultName, passphrase]);

	// Auto-unlock vault when passphrase is entered
	React.useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		
		async function autoUnlockVault() {
			if (activeTab === "create" && isReady && vaultName.trim() && passphrase.trim() && !identityRef.current && hoddorRef.current && !showGenerationStatus) {
				try {
					setStatus("Checking vault...");
					
					// Check if vault exists
					const vaults: any = await hoddorRef.current.list_vaults();
					if (Array.isArray(vaults) && vaults.includes(vaultName)) {
						// Vault exists, try to authenticate
						setStatus("Authenticating...");
						await deriveIdentity(passphrase, vaultName);
						setStatus("Loading secrets...");
						await handleReadAll();
						setStatus("✅ Vault unlocked successfully!");
					} else {
						// Vault doesn't exist, that's okay - user might be creating a new one
						setStatus("");
					}
				} catch (err: any) {
					console.error("Auto-unlock failed:", err);
					setStatus(`❌ Authentication failed: ${err?.message || String(err)}`);
				}
			}
		}

		// Debounce the auto-unlock to avoid too many requests while typing
		if (activeTab === "create" && vaultName.trim() && passphrase.trim() && !identityRef.current && !showGenerationStatus) {
			timeoutId = setTimeout(autoUnlockVault, 500); // 500ms debounce
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [activeTab, isReady, vaultName, passphrase, showGenerationStatus]);

	// Auto-retry vault unlock for "open" tab when passphrase changes
	React.useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		
		async function retryVaultUnlock() {
			if (activeTab === "open" && isReady && vaultName.trim() && passphrase.trim() && hoddorRef.current) {
				try {
					setStatus("Retrying vault unlock...");
					
					// Check if vault exists
					const vaults: any = await hoddorRef.current.list_vaults();
					if (Array.isArray(vaults) && vaults.includes(vaultName)) {
						// Clear previous identity and try again
						identityRef.current = null;
						setStatus("Authenticating...");
						await deriveIdentity(passphrase, vaultName);
						setStatus("Loading secrets...");
						await handleReadAll();
					} else {
						setStatus(`❌ Vault "${vaultName}" not found`);
					}
				} catch (err: any) {
					console.error("Retry unlock failed:", err);
					setStatus(`❌ Authentication failed: ${err?.message || String(err)}`);
				}
			}
		}

		// Debounce the retry to avoid too many requests while typing
		if (activeTab === "open" && vaultName.trim() && passphrase.trim()) {
			timeoutId = setTimeout(retryVaultUnlock, 700); // 700ms debounce, slightly longer for retry
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [activeTab, isReady, vaultName, passphrase]);

	async function deriveIdentity(currentPassphrase: string, currentVaultName: string) {
		if (!hoddorRef.current) throw new Error("Hoddor not ready");
		// Prefer vault-specific derivation
		const identity = await hoddorRef.current.vault_identity_from_passphrase(
			currentPassphrase,
			currentVaultName
		);
		identityRef.current = identity;
	}

	async function ensureVaultExists(name: string) {
		if (!hoddorRef.current || !name || !name.trim()) throw new Error("Vault name required");
		try {
			const vaults: any = await hoddorRef.current.list_vaults();
			if (!Array.isArray(vaults) || !vaults.includes(name)) {
				await hoddorRef.current.create_vault(name);
			}
		} catch (e) {
			// Fallback: try creating blindly if listing failed
			try { await hoddorRef.current.create_vault(name); } catch {}
		}
	}

	async function processVaultFile(file: File, targetVaultName?: string) {
		if (!isReady || !hoddorRef.current) return;
		
		const importVaultName = targetVaultName || vaultName || file.name.replace(/\.hoddor$/, '').trim() || 'imported_vault';
		
		try {
			setStatus("Reading file…");
			const buffer = await file.arrayBuffer();
			
			setStatus("Initializing storage…");
			// Ensure storage is properly initialized by trying to list vaults first
			try {
				await hoddorRef.current.list_vaults();
			} catch (initErr: any) {
				// If listing fails, try to create a temporary vault to initialize storage
				try {
					const tempName = `temp_init_${Date.now()}`;
					await hoddorRef.current.create_vault(tempName);
					await hoddorRef.current.remove_vault(tempName);
					try { await hoddorRef.current.force_cleanup_vault(tempName); } catch {}
				} catch (createErr) {
					console.warn("Storage initialization failed:", createErr);
				}
			}
			
			setStatus("Preparing vault…");
			// If a vault with the same name already exists, remove it before import
			try {
				const vaults: any = await hoddorRef.current.list_vaults();
				if (Array.isArray(vaults) && vaults.includes(importVaultName)) {
					setStatus("Replacing existing vault…");
					await hoddorRef.current.remove_vault(importVaultName);
					try { await hoddorRef.current.force_cleanup_vault(importVaultName); } catch {}
				}
			} catch {}
			
			setStatus("Importing vault…");
			try {
				await hoddorRef.current.import_vault(importVaultName, new Uint8Array(buffer));
			} catch (e: any) {
				// If import still complains about existence, force replace and retry once
				const msg = e?.message || String(e);
				if (msg && msg.toLowerCase().includes("exist")) {
					try { await hoddorRef.current.remove_vault(importVaultName); } catch {}
					try { await hoddorRef.current.force_cleanup_vault(importVaultName); } catch {}
					await hoddorRef.current.import_vault(importVaultName, new Uint8Array(buffer));
				} else {
					throw e;
				}
			}
			setStatus(`Vault "${importVaultName}" imported. Enter password to view secrets.`);
			
			// Update available vaults list
			try {
				const vaults: any = await hoddorRef.current.list_vaults();
				if (Array.isArray(vaults)) {
					setAvailableVaults(vaults);
				}
			} catch {}
			
		} catch (err: any) {
			console.error(err);
			setStatus(`Error: ${err?.message || String(err)}`);
		}
	}

	async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setIsDragging(false);
		setDragCounter(0);
		
		const file = e.dataTransfer.files?.[0];
		if (!file || !file.name.endsWith('.hoddor')) {
			setStatus("❌ Please drop a .hoddor vault file");
			return;
		}
		
		setPendingFile(file);
		setShowPasswordDialog(true);
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
	}

	function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setDragCounter(prev => prev + 1);
		setIsDragging(true);
	}

	function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setDragCounter(prev => {
			const newCount = prev - 1;
			if (newCount === 0) {
				setIsDragging(false);
			}
			return newCount;
		});
	}

	async function handlePasswordSubmit() {
		if (!passphrase || !pendingFile) return;
		
		setShowPasswordDialog(false);
		
		// Use the filename (without .hoddor extension) as the vault name
		const importVaultName = pendingFile.name.replace(/\.hoddor$/, '').trim() || 'imported_vault';
		setVaultName(importVaultName);
		
		await processVaultFile(pendingFile, importVaultName);
		
		// Defer identity derivation and secret loading to ensure proper re-rendering
		setTimeout(async () => {
			try {
				await deriveIdentity(passphrase, importVaultName);
				await handleReadAll();
				// Force a re-render by updating a state that triggers display
				setStatus("Vault unlocked! Secrets are ready.");
			} catch (err: any) {
				console.error(err);
				setStatus(`Error deriving identity: ${err?.message || String(err)}`);
			}
		}, 100);
		
		setPendingFile(null);
	}

	async function copyToClipboard(text: string, secretKey: string) {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedSecret(secretKey);
			setTimeout(() => setCopiedSecret(null), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function generateSecurePassword() {
		const lowercase = 'abcdefghijklmnopqrstuvwxyz';
		const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';
		const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
		const allChars = lowercase + uppercase + numbers + symbols;
		
		let password = '';
		// Ensure at least one character from each category
		password += lowercase[Math.floor(Math.random() * lowercase.length)];
		password += uppercase[Math.floor(Math.random() * uppercase.length)];
		password += numbers[Math.floor(Math.random() * numbers.length)];
		password += symbols[Math.floor(Math.random() * symbols.length)];
		
		// Fill the rest randomly (16 chars total)
		for (let i = 4; i < 16; i++) {
			password += allChars[Math.floor(Math.random() * allChars.length)];
		}
		
		// Shuffle the password
		return password.split('').sort(() => Math.random() - 0.5).join('');
	}

	async function handleCreateVault() {
		if (!isReady || !hoddorRef.current) return;
		try {
			setStatus("Creating vault…");
			await hoddorRef.current.create_vault(vaultName);
			await deriveIdentity(passphrase, vaultName);
			setStatus("Vault created and identity derived.");
		} catch (err: any) {
			console.error(err);
			setStatus(`Error: ${err?.message || String(err)}`);
		}
	}

	async function handleListNamespaces() {
		if (!isReady || !hoddorRef.current) return;
		try {
			await ensureVaultExists(vaultName);
			setStatus("Listing namespaces…");
			const list: string[] = await hoddorRef.current.list_namespaces(vaultName);
			setNamespaces(list || []);
			setStatus(`Found ${list?.length || 0} namespaces.`);
		} catch (err: any) {
			console.error(err);
			setStatus(`Error: ${err?.message || String(err)}`);
		}
	}

	async function handleReadAll() {
		if (!isReady || !hoddorRef.current) return;
		try {
			await ensureVaultExists(vaultName);
			if (!identityRef.current) {
				await deriveIdentity(passphrase, vaultName);
			}
			
			// Debug: Check if identity was created successfully
			if (!identityRef.current) {
				setStatus("❌ Failed to authenticate - check your passphrase");
				return;
			}
			
			const list: string[] = namespaces.length
				? namespaces
				: ((await hoddorRef.current.list_namespaces(vaultName)) as string[]);
			
			console.log(`Found ${list?.length || 0} namespaces:`, list);
			
			if (!list || list.length === 0) {
				// Try to get more vault information for debugging
				try {
					const vaultInfo = await hoddorRef.current.export_vault(vaultName);
					const vaultSize = vaultInfo.byteLength;
					console.log(`Vault "${vaultName}" is authenticated but empty. Vault size: ${vaultSize} bytes`);
					setStatus(`✅ Vault "${vaultName}" authenticated successfully but contains no secrets. This appears to be an empty vault (${vaultSize} bytes).`);
				} catch (exportErr) {
					console.log("Could not get vault info:", exportErr);
					setStatus(`✅ Vault "${vaultName}" authenticated but contains no secrets. This vault appears to be empty.`);
				}
				setSecrets({});
				setNamespaces([]);
				return;
			}
			
			const out: Record<string, unknown> = {};
			for (const ns of list || []) {
				try {
					const value = await hoddorRef.current.read_from_vault(
						vaultName,
						identityRef.current,
						ns
					);
					out[ns] = value;
					console.log(`Successfully read namespace: ${ns}`);
				} catch (readErr: any) {
					console.error(`Failed to read namespace ${ns}:`, readErr);
					setStatus(`❌ Failed to decrypt namespace "${ns}" - check passphrase`);
					return;
				}
			}
			// Force synchronous state updates to prevent batching issues
			flushSync(() => {
				setSecrets(out);
				setNamespaces(list || []);
			});
			setStatus(`✅ Successfully loaded ${list.length} secret${list.length === 1 ? '' : 's'}`);
		} catch (err: any) {
			console.error("handleReadAll error:", err);
			setStatus(`❌ Error: ${err?.message || String(err)}`);
		}
	}

	function validateForm() {
		const errors: {namespace?: string; secret?: string} = {};
		
		if (!newNamespace.trim()) {
			errors.namespace = "Namespace is required";
		}
		if (!newSecret.trim()) {
			errors.secret = "Secret value is required";
		}
		
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	}

	async function handleUpsert() {
		if (!isReady || !hoddorRef.current) return;
		
		// Validate form
		if (!validateForm()) {
			setStatus("Please fill in all required fields.");
			return;
		}

		try {
			setStatus("Adding secret...");
			await ensureVaultExists(vaultName);
			if (!identityRef.current) {
				await deriveIdentity(passphrase, vaultName);
			}
			let parsed: unknown = newSecret;
			try {
				parsed = JSON.parse(newSecret);
			} catch {
				// keep as string
			}
			await hoddorRef.current.upsert_vault(
				vaultName,
				identityRef.current,
				newNamespace,
				parsed,
				null,
				replaceExisting
			);
			setStatus(`✅ Secret "${newNamespace}" ${editingSecret ? 'updated' : 'added'} successfully!`);
			
			// Clear the form and errors for next entry
			setNewNamespace("");
			setNewSecret("");
			setFormErrors({});
			setEditingSecret(null);
			
			// Refresh the secrets list
			await handleReadAll();
			
			// If we just created a new vault, update the available vaults list
			if (isCreatingNewVault && hoddorRef.current) {
				try {
					const vaults: any = await hoddorRef.current.list_vaults();
					if (Array.isArray(vaults)) {
						setAvailableVaults(vaults);
						setIsCreatingNewVault(false);
					}
				} catch (err) {
					console.log("Failed to refresh vault list:", err);
				}
			}
		} catch (err: any) {
			console.error(err);
			setStatus(`❌ Error: ${err?.message || String(err)}`);
		}
	}

	async function deleteSecret(namespace: string) {
		if (!isReady || !hoddorRef.current || !identityRef.current) return;
		
		try {
			setStatus(`Removing "${namespace}" from vault...`);
			
			// Get all current namespaces except the one we want to delete
			const currentNamespaces = Object.keys(secrets);
			const remainingNamespaces = currentNamespaces.filter(ns => ns !== namespace);
			
			// Create a new vault with only the remaining secrets
			const tempVaultName = `${vaultName}_temp_${Date.now()}`;
			await hoddorRef.current.create_vault(tempVaultName);
			
			// Copy all secrets except the deleted one to temp vault
			for (const ns of remainingNamespaces) {
				const value = secrets[ns];
				await hoddorRef.current.upsert_vault(
					tempVaultName,
					identityRef.current,
					ns,
					value,
					null,
					true
				);
			}
			
			// Remove original vault
			await hoddorRef.current.remove_vault(vaultName);
			try { await hoddorRef.current.force_cleanup_vault(vaultName); } catch {}
			
			// Rename temp vault to original name
			const tempVaultData = await hoddorRef.current.export_vault(tempVaultName);
			await hoddorRef.current.remove_vault(tempVaultName);
			try { await hoddorRef.current.force_cleanup_vault(tempVaultName); } catch {}
			
			await hoddorRef.current.import_vault(vaultName, tempVaultData);
			
			// Refresh the secrets list
			await handleReadAll();
			
			setStatus(`✅ Secret "${namespace}" deleted successfully!`);
		} catch (err: any) {
			console.error(err);
			setStatus(`❌ Error deleting secret: ${err?.message || String(err)}`);
		}
	}

	function editSecret(namespace: string) {
		const secret = secrets[namespace];
		setEditingSecret(namespace);
		setNewNamespace(namespace);
		setNewSecret(typeof secret === 'string' ? secret : JSON.stringify(secret, null, 2));
		setFormErrors({});
	}

	async function handleExport() {
		if (!isReady || !hoddorRef.current) return;
		try {
			await ensureVaultExists(vaultName);
			setStatus("Exporting vault…");
			const bytes: Uint8Array = await hoddorRef.current.export_vault(vaultName);
			const blob = new Blob([bytes], { type: "application/octet-stream" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${vaultName}.hoddor`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
			setStatus("Vault exported.");
		} catch (err: any) {
			console.error(err);
			setStatus(`Error: ${err?.message || String(err)}`);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
			<div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
				{/* Header */}
				<motion.div 
					className="text-center py-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.h1 
						className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.1 }}
					>
						Hoddor Vault
					</motion.h1>
					<motion.p 
						className="text-gray-400 text-sm mb-4"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.2 }}
					>
						Securely decrypt and manage your encrypted vault files
					</motion.p>
					<motion.div
						className="flex justify-center"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 }}
					>
						<a
							href="/share-secret"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-300 hover:from-red-600/30 hover:to-orange-600/30 border border-red-500/30 transition-all duration-200"
						>
							🔥 Share Self-Destructing Secret
						</a>
					</motion.div>
				</motion.div>

				{/* Tabs */}
				<motion.div 
					className="flex items-center justify-center gap-1 p-1 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/60 w-fit mx-auto"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, delay: 0.5 }}
				>
					<motion.button
						className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === "open" ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
						onClick={() => setActiveTab("open")}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{activeTab === "open" && (
							<motion.div
								layoutId="activeTab"
								className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl"
								transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
							/>
						)}
						<span className="relative inline-flex items-center gap-2">
							<FolderOpen className="w-4 h-4" /> Open Vault
						</span>
					</motion.button>
					<motion.button
						className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === "create" ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
						onClick={() => setActiveTab("create")}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{activeTab === "create" && (
							<motion.div
								layoutId="activeTab"
								className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl"
								transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
							/>
						)}
						<span className="relative inline-flex items-center gap-2">
							<PlusCircle className="w-4 h-4" /> Create Vault
						</span>
					</motion.button>
				</motion.div>


				{/* Password Input for Open Tab - shows after vault is imported */}
				{activeTab === "open" && vaultName && availableVaults.includes(vaultName) && Object.keys(secrets).length === 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="relative group"
					>
						<div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/60 rounded-3xl p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
									<Key className="w-6 h-6 text-blue-400" />
								</div>
								<div>
									<h3 className="text-white font-bold text-xl">Enter Vault Password</h3>
									<p className="text-gray-400">Vault "{vaultName}" imported successfully</p>
								</div>
							</div>
							
							<div className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
										<Key className="w-4 h-4" />
										Passphrase
									</label>
									<div className="relative">
										<input
											type={showPassword ? "text" : "password"}
											placeholder="Enter your vault passphrase"
											value={passphrase}
											onChange={(e) => setPassphrase(e.target.value)}
											className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										/>
										<button
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
											title={showPassword ? "Hide password" : "Show password"}
										>
											{showPassword ? (
												<EyeOff className="w-5 h-5" />
											) : (
												<Eye className="w-5 h-5" />
											)}
										</button>
									</div>
								</div>
								
								<motion.button
									onClick={async () => {
										if (passphrase.trim()) {
											try {
												identityRef.current = null; // Clear previous identity
												setStatus("Authenticating...");
												await deriveIdentity(passphrase, vaultName);
												setStatus("Loading secrets...");
												await handleReadAll();
											} catch (err: any) {
												console.error("Manual unlock failed:", err);
												setStatus(`❌ Authentication failed: ${err?.message || String(err)}`);
											}
										}
									}}
									disabled={!passphrase.trim()}
									className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-blue-500/30 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									<Unlock className="w-5 h-5" />
									Unlock Vault
								</motion.button>
							</div>
						</div>
					</motion.div>
				)}

				{/* Dropzone */}
				{activeTab === "open" && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="relative group"
					>
						<div
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}
							className={`relative p-8 border-2 border-dashed rounded-2xl text-center backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.01] ${
								isDragging 
									? "border-green-400/80 bg-gradient-to-br from-green-900/20 to-emerald-900/20 scale-[1.02] shadow-lg shadow-green-500/20" 
									: "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-600/50 hover:border-blue-500/60 hover:bg-gradient-to-br hover:from-blue-900/10 hover:to-cyan-900/10"
							}`}
						>
							{/* Glow effect */}
							<div className={`absolute -inset-1 rounded-2xl transition-opacity duration-300 blur-xl ${
								isDragging 
									? "bg-gradient-to-r from-green-500/30 to-emerald-500/30 opacity-100" 
									: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
							}`} />
							
							<div className="relative z-10 flex flex-col items-center gap-4">
								<motion.div 
									className={`p-4 rounded-xl border transition-all duration-300 ${
										isDragging 
											? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/40" 
											: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20"
									}`}
									whileHover={{ scale: isDragging ? 1.1 : 1.05, rotate: isDragging ? 0 : 5 }}
									transition={{ type: "spring", stiffness: 300 }}
									animate={{ 
										scale: isDragging ? 1.1 : 1,
										rotate: isDragging ? 2 : 0
									}}
								>
									<UploadCloud className={`w-10 h-10 transition-colors duration-300 ${
										isDragging ? "text-green-400" : "text-blue-400"
									}`} />
								</motion.div>
								<div className="space-y-2">
									<h3 className={`text-lg font-bold transition-colors duration-300 ${
										isDragging ? "text-green-300" : "text-white"
									}`}>
										{isDragging ? "Drop to upload vault file!" : "Drop your .hoddor vault file here"}
									</h3>
									<p className={`text-sm transition-colors duration-300 ${
										isDragging ? "text-green-400" : "text-gray-400"
									}`}>
										{isDragging ? "Release to import your encrypted vault" : "Select or drag & drop to decrypt your vault"}
									</p>
								</div>
								<input
									type="file"
									accept=".hoddor"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file && file.name.endsWith('.hoddor')) {
											setPendingFile(file);
											setShowPasswordDialog(true);
										}
									}}
									className="hidden"
									id="hoddor-file-input"
								/>
								<motion.label
									htmlFor="hoddor-file-input"
									className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-blue-500/30 hover:from-blue-500 hover:to-cyan-500 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									<FolderOpen className="w-5 h-5" /> Select Vault File
								</motion.label>
							</div>
						</div>
					</motion.div>
				)}

				{/* Status Messages */}
				{status && (
					<motion.div 
						className={`p-4 rounded-xl backdrop-blur-sm border ${initError ? "bg-red-500/10 border-red-500/30 text-red-300" : "bg-blue-500/10 border-blue-500/30 text-blue-300"}`}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex items-center justify-between gap-3">
							<div className="flex items-center gap-2">
								{initError ? (
									<div className="w-2 h-2 rounded-full bg-red-400" />
								) : (
									<div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
								)}
								{status}
							</div>
							{status.includes("authenticated successfully but contains no secrets") && (
								<motion.button
									onClick={async () => {
										try {
											const vaults = await hoddorRef.current?.list_vaults();
											const vaultInfo = await hoddorRef.current?.export_vault(vaultName);
											console.log("Available vaults:", vaults);
											console.log("Current vault export size:", vaultInfo?.byteLength);
											setStatus(`📊 Vault diagnostics: Found ${vaults?.length || 0} total vaults. Current vault "${vaultName}" size: ${vaultInfo?.byteLength || 0} bytes. Check console for details.`);
										} catch (err) {
											console.error("Diagnostic error:", err);
											setStatus(`❌ Could not get vault diagnostics: ${err}`);
										}
									}}
									className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 transition-all duration-200"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									title="Show vault diagnostics"
								>
									📊 Show Diagnostics
								</motion.button>
							)}
							{status.includes("🎲 Secure password generated!") && (
								<motion.button
									onClick={async () => {
										try {
											await navigator.clipboard.writeText(passphrase);
											setGeneratedPasswordCopied(true);
											setTimeout(() => setGeneratedPasswordCopied(false), 2000);
										} catch (err) {
											console.error('Failed to copy password:', err);
										}
									}}
									className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 transition-all duration-200"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									title="Copy generated password"
								>
									{generatedPasswordCopied ? (
										<>
											<Check className="w-4 h-4 text-green-400" />
											<span className="text-green-400">Copied!</span>
										</>
									) : (
										<>
											<Copy className="w-4 h-4" />
											Copy
										</>
									)}
								</motion.button>
							)}
						</div>
					</motion.div>
				)}
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

				{/* Create Vault Card */}
				{activeTab === "create" && (
					<motion.div 
						className="relative group"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						{/* Glow effect */}
						<div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
						
						<div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/60 rounded-3xl p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
									<PlusCircle className="w-6 h-6 text-purple-400" />
								</div>
								<h3 className="text-white font-bold text-xl">Create New Vault</h3>
							</div>
							
							{/* Vault Configuration */}
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
											<Shield className="w-4 h-4" />
											Vault Selection
											{Object.keys(secrets).length > 0 && (
												<span className="text-xs text-green-400">(loaded with {Object.keys(secrets).length} secrets)</span>
											)}
										</label>
										{isCreatingNewVault ? (
											// Creating new vault
											<div className="space-y-2">
												<input
													type="text"
													placeholder="Enter new vault name"
													value={customVaultName}
													onChange={(e) => {
														setCustomVaultName(e.target.value);
														setVaultName(e.target.value);
													}}
													className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
												/>
												<div className="flex gap-2">
													{availableVaults.length > 0 && (
														<button
															onClick={() => {
																setIsCreatingNewVault(false);
																setCustomVaultName("");
																setVaultName(availableVaults[0] || "");
															}}
															className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
														>
															← Back to existing vaults
														</button>
													)}
													{Object.keys(secrets).length > 0 && (
														<button
															onClick={() => {
																// Clear current vault state
																setSecrets({});
																setNamespaces([]);
																identityRef.current = null;
																setStatus("Vault cleared. Enter vault name and passphrase to continue.");
															}}
															className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
														>
															🗑️ Clear current vault
														</button>
													)}
												</div>
											</div>
										) : (
											// Selecting existing vault
											<div className="space-y-2">
												<select
													value={vaultName}
													onChange={(e) => {
														const newVaultName = e.target.value;
														if (newVaultName !== vaultName) {
															// Clear current vault state when switching
															setSecrets({});
															setNamespaces([]);
															identityRef.current = null;
															setStatus("");
															setVaultName(newVaultName);
														}
													}}
													className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
												>
													{availableVaults.map((vault) => (
														<option key={vault} value={vault} className="bg-gray-800">
															{vault}
														</option>
													))}
												</select>
												<div className="flex gap-2">
													<button
														onClick={() => {
															setIsCreatingNewVault(true);
															setVaultName("");
															setCustomVaultName("");
															// Clear current vault state when switching to new vault creation
															setSecrets({});
															setNamespaces([]);
															identityRef.current = null;
															setStatus("");
														}}
														className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
													>
														+ Create new vault instead
													</button>
													{Object.keys(secrets).length > 0 && (
														<button
															onClick={() => {
																// Clear current vault state
																setSecrets({});
																setNamespaces([]);
																identityRef.current = null;
																setStatus("Vault cleared. Select a vault to continue.");
															}}
															className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
														>
															🗑️ Clear current vault
														</button>
													)}
												</div>
											</div>
										)}
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
											<Key className="w-4 h-4" />
											Master Passphrase
											{identityRef.current && (
												<span className="text-xs text-green-400">(authenticated)</span>
											)}
										</label>
										<div className="relative flex gap-2">
											<div className="relative flex-1">
												<input
													type={showPassword ? "text" : "password"}
													placeholder="Enter secure passphrase"
													value={passphrase}
													onChange={(e) => setPassphrase(e.target.value)}
													className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
												/>
												<button
													onClick={() => setShowPassword(!showPassword)}
													className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
													title={showPassword ? "Hide password" : "Show password"}
												>
													{showPassword ? (
														<EyeOff className="w-5 h-5" />
													) : (
														<Eye className="w-5 h-5" />
													)}
												</button>
											</div>
											<motion.button
												onClick={() => {
													const newPassword = generateSecurePassword();
													setPassphrase(newPassword);
													setStatus("🎲 Secure password generated!");
													setGeneratedPasswordCopied(false);
													setShowGenerationStatus(true);
													// Hide generation status after 5 seconds
													setTimeout(() => {
														setShowGenerationStatus(false);
													}, 5000);
												}}
												className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl border border-emerald-500/30 hover:from-emerald-500 hover:to-green-500 transition-all duration-200 flex items-center gap-2"
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												title="Generate secure password"
											>
												<Dices className="w-4 h-4" />
												<span className="hidden sm:inline text-sm font-medium">Generate</span>
											</motion.button>
											{identityRef.current && (
												<button
													onClick={() => {
														identityRef.current = null;
														setPassphrase("");
														setStatus("Authentication cleared. Enter passphrase to re-authenticate.");
													}}
													className="px-3 py-3 text-xs text-orange-400 hover:text-orange-300 transition-colors rounded-xl bg-gray-800/80 border border-gray-700"
													title="Clear authentication"
												>
													🗑️
												</button>
											)}
										</div>
									</div>
								</div>

								{/* Current Secrets Display */}
								{Object.keys(secrets).length > 0 && (
									<div className="border-t border-gray-700/50 pt-6">
										<div className="flex items-center gap-3 mb-4">
											<div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
												<Unlock className="w-5 h-5 text-green-400" />
											</div>
											<h4 className="text-white font-semibold text-lg">Current Secrets</h4>
											<div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30">
												{Object.keys(secrets).length} secrets
											</div>
										</div>
										<div className="grid gap-3 max-h-48 overflow-y-auto">
											{Object.entries(secrets).map(([ns, value]) => (
												<div key={ns} className="group flex items-center justify-between p-3 bg-gray-900/40 border border-gray-700/40 rounded-xl hover:border-green-500/50 transition-all duration-200">
													<div className="flex items-center gap-3 flex-1 min-w-0">
														<div className="w-2 h-2 rounded-full bg-green-400" />
														<span className="font-medium text-white">{ns}</span>
														<div className="text-xs text-gray-400 truncate">
															{String(value).length > 50 ? `${String(value).substring(0, 50)}...` : String(value)}
														</div>
													</div>
													<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
														<motion.button
															onClick={() => copyToClipboard(typeof value === 'string' ? value : JSON.stringify(value, null, 2), ns)}
															className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30 transition-colors"
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															title="Copy secret"
														>
															{copiedSecret === ns ? (
																<Check className="w-3.5 h-3.5 text-green-400" />
															) : (
																<Copy className="w-3.5 h-3.5" />
															)}
														</motion.button>
														<motion.button
															onClick={() => editSecret(ns)}
															className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 transition-colors"
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															title="Edit secret"
														>
															<Key className="w-3.5 h-3.5" />
														</motion.button>
														<motion.button
															onClick={() => setDeleteConfirmation({show: true, secretName: ns})}
															className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 transition-colors"
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															title="Delete secret"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</motion.button>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Add Secret Section */}
								<div className="border-t border-gray-700/50 pt-6">
									<h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
										<Lock className="w-5 h-5 text-purple-400" />
										{Object.keys(secrets).length === 0 ? 'Add First Secret' : 'Add Another Secret'}
										{Object.keys(secrets).length > 0 && vaultName && (
											<span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
												{vaultName} vault loaded
											</span>
										)}
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-300">
												Namespace {editingSecret && <span className="text-xs text-yellow-400">(editing)</span>}
											</label>
											<input
												type="text"
												placeholder="e.g. email, api-key"
												value={newNamespace}
												onChange={(e) => {
													setNewNamespace(e.target.value);
													if (formErrors.namespace) {
														setFormErrors(prev => ({...prev, namespace: undefined}));
													}
												}}
												className={`w-full px-4 py-3 bg-gray-900/60 border rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
													formErrors.namespace 
														? 'border-red-500 focus:ring-red-500' 
														: 'border-gray-600 focus:ring-purple-500'
												}`}
											/>
											{formErrors.namespace && (
												<p className="text-red-400 text-xs">{formErrors.namespace}</p>
											)}
										</div>
										<div className="md:col-span-2 space-y-2">
											<label className="text-sm font-medium text-gray-300">Secret Value</label>
											<textarea
												placeholder="Enter your secret (JSON or text)"
												value={newSecret}
												onChange={(e) => {
													setNewSecret(e.target.value);
													if (formErrors.secret) {
														setFormErrors(prev => ({...prev, secret: undefined}));
													}
												}}
												rows={4}
												className={`w-full px-4 py-3 bg-gray-900/60 border rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
													formErrors.secret 
														? 'border-red-500 focus:ring-red-500' 
														: 'border-gray-600 focus:ring-purple-500'
												}`}
											/>
											{formErrors.secret && (
												<p className="text-red-400 text-xs">{formErrors.secret}</p>
											)}
										</div>
									</div>
								</div>

								<label className="flex items-center gap-3 text-gray-300 cursor-pointer">
									<input 
										type="checkbox" 
										checked={replaceExisting} 
										onChange={(e) => setReplaceExisting(e.target.checked)}
										className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
									/>
									<span className="font-medium">Replace if exists</span>
								</label>

								{/* Action Buttons */}
								<div className="flex flex-wrap gap-4 pt-4">
									<motion.button 
										onClick={handleUpsert} 
										disabled={!isReady || (!identityRef.current && (!passphrase || !vaultName || (isCreatingNewVault && !customVaultName.trim()))) || !newNamespace.trim() || !newSecret.trim()}
										className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-500/30 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Lock className="w-5 h-5" />
										{editingSecret ? `Update "${editingSecret}"` : Object.keys(secrets).length === 0 ? 'Create Vault & Add Secret' : 'Add Secret'}
									</motion.button>
									{editingSecret && (
										<motion.button 
											onClick={() => {
												setEditingSecret(null);
												setNewNamespace("");
												setNewSecret("");
												setFormErrors({});
											}}
											className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 transition-all duration-200"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.95 }}
										>
											Cancel Edit
										</motion.button>
									)}
									<motion.button 
										onClick={handleExport} 
										disabled={!isReady || !vaultName}
										className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white border border-green-500/30 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-green-500/25"
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Download className="w-5 h-5" />
										Export Vault
									</motion.button>
								</div>
							</div>
						</div>
					</motion.div>
				)}


				{/* Secrets Display */}
				{Object.keys(secrets).length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<div className="flex items-center gap-3 mb-8">
							<div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
								<Unlock className="w-6 h-6 text-green-400" />
							</div>
							<h3 className="text-white font-bold text-2xl">Decrypted Secrets</h3>
							<div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30">
								{Object.keys(secrets).length} secrets
							</div>
						</div>
						<div className="grid gap-6">
							{Object.entries(secrets).map(([ns, value], index) => {
								const secretText = (() => {
									try {
										// Try to parse as JSON first
										if (typeof value === 'string') {
											JSON.parse(value);
											return JSON.stringify(JSON.parse(value), null, 2);
										}
										return JSON.stringify(value, null, 2);
									} catch {
										// If not JSON, check if it looks like environment variables or key-value pairs
										const str = String(value);
										if (str.includes('=')) {
											// Handle environment variables
											if (str.includes('\\n')) {
												// Handle escaped newlines
												return str.replace(/\\n/g, '\n');
											} else {
												// Split long environment variable strings into separate lines
												// Match patterns like KEY=value and put each on a new line
												return str
													.replace(/([A-Z_][A-Z0-9_]*=[^\s]*)/g, '\n$1')
													.replace(/^\n/, '') // Remove leading newline
													.split('\n')
													.map(line => line.trim())
													.filter(line => line.length > 0)
													.join('\n');
											}
										}
										return str;
									}
								})();

								const isEnvVars = secretText.includes('=') && (secretText.includes('\n') || secretText.includes('\\n'));
								const isJSON = (() => {
									try {
										JSON.parse(typeof value === 'string' ? value : JSON.stringify(value));
										return true;
									} catch {
										return false;
									}
								})();
								
								return (
									<motion.div 
										key={ns} 
										className="relative group"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: 0.1 * index }}
									>
										{/* Glow effect */}
										<div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
										
										<div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300">
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center gap-3">
													<div className="w-2 h-2 rounded-full bg-green-400" />
													<span className="font-bold text-white text-lg">{ns}</span>
													{isEnvVars && (
														<span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
															ENV
														</span>
													)}
													{isJSON && (
														<span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/30">
															JSON
														</span>
													)}
												</div>
												<motion.button
													onClick={() => copyToClipboard(secretText, ns)}
													className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-700/50 text-gray-300 hover:bg-green-600/20 hover:text-green-300 hover:border-green-500/30 border border-transparent transition-all duration-200"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													{copiedSecret === ns ? (
														<>
															<Check className="w-4 h-4 text-green-400" />
															<span className="text-green-400">Copied!</span>
														</>
													) : (
														<>
															<Copy className="w-4 h-4" />
															Copy
														</>
													)}
												</motion.button>
											</div>
											<div className="relative">
												<pre className={`m-0 whitespace-pre-wrap break-all text-sm text-gray-300 bg-gray-900/40 border border-gray-700/40 p-4 rounded-xl overflow-hidden font-mono leading-relaxed max-w-full ${isEnvVars ? 'text-green-300' : ''} ${isJSON ? 'text-blue-300' : ''}`}>
													{secretText}
												</pre>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					</motion.div>
				)}

				{/* Delete Confirmation Modal */}
				{deleteConfirmation?.show && (
					<motion.div 
						className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								setDeleteConfirmation(null);
							}
						}}
					>
						<motion.div 
							className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/60 rounded-3xl p-8 max-w-md w-full shadow-2xl"
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							{/* Glow effect */}
							<div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl opacity-50 blur-xl" />
							
							<div className="relative">
								<div className="flex items-center gap-4 mb-6">
									<div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
										<AlertTriangle className="w-8 h-8 text-red-400" />
									</div>
									<div>
										<h3 className="text-white font-bold text-2xl mb-1">Delete Secret</h3>
										<p className="text-gray-400">This action cannot be undone</p>
									</div>
								</div>
								
								<div className="bg-gray-900/40 border border-gray-700/40 rounded-2xl p-4 mb-6">
									<div className="text-sm font-medium text-gray-300 mb-2">Secret to delete:</div>
									<div className="text-red-400 font-mono text-lg">{deleteConfirmation.secretName}</div>
								</div>
								
								<div className="flex gap-3">
									<motion.button
										onClick={() => {
											deleteSecret(deleteConfirmation.secretName);
											setDeleteConfirmation(null);
										}}
										className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-red-600 to-orange-600 text-white border border-red-500/30 hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Trash2 className="w-5 h-5" />
										Delete Secret
									</motion.button>
									<motion.button
										onClick={() => setDeleteConfirmation(null)}
										className="px-6 py-4 rounded-2xl text-base font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 transition-all duration-200"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.95 }}
									>
										Cancel
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}

				{/* Password Dialog */}
				{showPasswordDialog && pendingFile && (
					<motion.div 
						className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								setShowPasswordDialog(false);
								setPendingFile(null);
							}
						}}
					>
						<motion.div 
							className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/60 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							{/* Glow effect */}
							<div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl opacity-50 blur-xl" />
							
							<div className="relative">
								<div className="flex items-center gap-4 mb-6">
									<div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
										<Lock className="w-8 h-8 text-blue-400" />
									</div>
									<div>
										<h3 className="text-white font-bold text-2xl mb-1">Enter Vault Password</h3>
										<p className="text-gray-400">Unlock your encrypted vault to view secrets</p>
									</div>
								</div>
								
								<div className="bg-gray-900/40 border border-gray-700/40 rounded-2xl p-4 mb-6">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
											<FolderOpen className="w-5 h-5 text-blue-400" />
										</div>
										<div>
											<div className="text-sm font-medium text-gray-300">Selected File:</div>
											<div className="text-blue-400 font-mono">{pendingFile.name}</div>
										</div>
									</div>
								</div>
								
								<div className="space-y-6">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
											<Key className="w-4 h-4" />
											Passphrase
										</label>
										<input
											type="password"
											placeholder="Enter your secure passphrase"
											value={passphrase}
											onChange={(e) => setPassphrase(e.target.value)}
											className="w-full px-4 py-4 bg-gray-900/60 border border-gray-600 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													handlePasswordSubmit();
												}
											}}
											autoFocus
										/>
									</div>
									
									<div className="flex gap-3">
										<motion.button
											onClick={handlePasswordSubmit}
											className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-base font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-blue-500/30 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
											whileHover={{ scale: 1.02, y: -2 }}
											whileTap={{ scale: 0.95 }}
										>
											<Unlock className="w-5 h-5" />
											Unlock Vault
										</motion.button>
										<motion.button
											onClick={() => {
												setShowPasswordDialog(false);
												setPendingFile(null);
											}}
											className="px-6 py-4 rounded-2xl text-base font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 transition-all duration-200"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.95 }}
										>
											Cancel
										</motion.button>
									</div>
								</div>
							</div>
						</motion.div>
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
							<div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mt-1">
								<Shield className="w-5 h-5 text-yellow-400" />
							</div>
							<div>
								<h4 className="font-semibold text-yellow-400 mb-2">Security Tips</h4>
								<p className="text-gray-300 text-sm leading-relaxed">
									Share vault files and passphrases through separate, secure channels. Recipients need both the file and correct passphrase to decrypt secrets.
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

const primaryBtn = "inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500/30 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed";
const secondaryBtn = "inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm bg-gray-800/40 text-gray-100 border-gray-700 hover:bg-gray-800/60 disabled:opacity-50 disabled:cursor-not-allowed";
const tabBtn = "px-3 py-1.5 rounded-full text-sm border border-gray-700 text-gray-300 bg-gray-800/40 hover:bg-gray-800/60";
const tabActive = "bg-blue-600/30 border-blue-500/40 text-white";


