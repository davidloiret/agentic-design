import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SECRETS_DIR = path.join(process.cwd(), '.secrets');

// Ensure secrets directory exists
async function ensureSecretsDir() {
  try {
    await fs.access(SECRETS_DIR);
  } catch {
    await fs.mkdir(SECRETS_DIR, { recursive: true });
  }
}

interface SecretData {
  id: string;
  vault: number[];
  expiresAt: string;
  maxViews: number;
  viewCount: number;
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    await ensureSecretsDir();
    
    const { id, vault, expiresAt, maxViews } = await request.json();
    
    if (!id || !vault || !expiresAt || !maxViews) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Validate vault size (10MB limit)
    const MAX_VAULT_SIZE = 10 * 1024 * 1024; // 10MB
    const vaultSize = vault.length;
    if (vaultSize > MAX_VAULT_SIZE) {
      return NextResponse.json({ 
        error: `Vault too large (${(vaultSize / 1024 / 1024).toFixed(2)}MB). Maximum size is 10MB.` 
      }, { status: 413 });
    }
    
    const secretData: SecretData = {
      id,
      vault,
      expiresAt,
      maxViews,
      viewCount: 0,
      createdAt: new Date().toISOString()
    };
    
    const filePath = path.join(SECRETS_DIR, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(secretData, null, 2));
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error storing secret:', error);
    return NextResponse.json({ error: 'Failed to store secret' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureSecretsDir();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Secret ID required' }, { status: 400 });
    }
    
    const filePath = path.join(SECRETS_DIR, `${id}.json`);
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const secretData: SecretData = JSON.parse(fileContent);
      
      // Check if expired
      if (new Date() > new Date(secretData.expiresAt)) {
        // Delete expired secret
        await fs.unlink(filePath);
        return NextResponse.json({ error: 'Secret has expired' }, { status: 404 });
      }
      
      // Check if max views exceeded
      if (secretData.viewCount >= secretData.maxViews) {
        // Delete secret that has been viewed too many times
        await fs.unlink(filePath);
        return NextResponse.json({ error: 'Secret has been viewed maximum times' }, { status: 404 });
      }
      
      // Increment view count
      secretData.viewCount += 1;
      
      // If this is the last allowed view, we'll delete after returning
      const shouldDelete = secretData.viewCount >= secretData.maxViews;
      
      if (!shouldDelete) {
        // Update view count if not deleting
        await fs.writeFile(filePath, JSON.stringify(secretData, null, 2));
      }
      
      // Return the vault data
      const response = NextResponse.json({
        vault: secretData.vault,
        viewCount: secretData.viewCount,
        maxViews: secretData.maxViews,
        expiresAt: secretData.expiresAt,
        isLastView: shouldDelete
      });
      
      // Delete after sending response if this was the last view
      if (shouldDelete) {
        setImmediate(async () => {
          try {
            await fs.unlink(filePath);
            console.log(`Secret ${id} auto-deleted after final view`);
          } catch (err) {
            console.error(`Failed to delete secret ${id}:`, err);
          }
        });
      }
      
      return response;
      
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return NextResponse.json({ error: 'Secret not found or already destroyed' }, { status: 404 });
      }
      throw error;
    }
    
  } catch (error) {
    console.error('Error retrieving secret:', error);
    return NextResponse.json({ error: 'Failed to retrieve secret' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureSecretsDir();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Secret ID required' }, { status: 400 });
    }
    
    const filePath = path.join(SECRETS_DIR, `${id}.json`);
    
    try {
      await fs.unlink(filePath);
      return NextResponse.json({ success: true, message: 'Secret destroyed' });
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
      }
      throw error;
    }
    
  } catch (error) {
    console.error('Error deleting secret:', error);
    return NextResponse.json({ error: 'Failed to delete secret' }, { status: 500 });
  }
}

// Cleanup expired secrets (can be called by a cron job)
export async function PATCH() {
  try {
    await ensureSecretsDir();
    
    const files = await fs.readdir(SECRETS_DIR);
    let cleaned = 0;
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const filePath = path.join(SECRETS_DIR, file);
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const secretData: SecretData = JSON.parse(fileContent);
        
        if (new Date() > new Date(secretData.expiresAt)) {
          await fs.unlink(filePath);
          cleaned++;
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
        // Delete corrupted files
        await fs.unlink(filePath);
        cleaned++;
      }
    }
    
    return NextResponse.json({ success: true, cleaned });
  } catch (error) {
    console.error('Error cleaning up secrets:', error);
    return NextResponse.json({ error: 'Failed to cleanup secrets' }, { status: 500 });
  }
}