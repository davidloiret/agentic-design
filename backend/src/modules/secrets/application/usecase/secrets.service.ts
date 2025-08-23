import { Injectable, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { promises as fs } from 'fs';
import path from 'path';
import { CreateSecretDto } from '../dto/create-secret.dto';
import { SecretResponseDto } from '../dto/secret-response.dto';

interface SecretData {
  id: string;
  vault: number[];
  expiresAt: string;
  maxViews: number;
  viewCount: number;
  createdAt: string;
}

@Injectable()
export class SecretsService {
  private readonly SECRETS_DIR = path.join(process.cwd(), '.secrets');
  private readonly MAX_VAULT_SIZE = 10 * 1024 * 1024; // 10MB

  private async ensureSecretsDir() {
    try {
      await fs.access(this.SECRETS_DIR);
    } catch {
      await fs.mkdir(this.SECRETS_DIR, { recursive: true });
    }
  }

  async createSecret(createSecretDto: CreateSecretDto): Promise<{ success: boolean; id: string }> {
    try {
      console.log('Creating secret with ID:', createSecretDto.id);
      console.log('Vault size:', createSecretDto.vault?.length || 0, 'bytes');
      
      await this.ensureSecretsDir();

      const { id, vault, expiresAt, maxViews } = createSecretDto;

      // Validate inputs
      if (!id || !vault || !expiresAt || !maxViews) {
        throw new Error('Missing required fields: id, vault, expiresAt, maxViews');
      }

      // Validate vault size (10MB limit)
      const vaultSize = vault.length;
      console.log('Validating vault size:', vaultSize, 'bytes');
      
      if (vaultSize > this.MAX_VAULT_SIZE) {
        throw new PayloadTooLargeException(
          `Vault too large (${(vaultSize / 1024 / 1024).toFixed(2)}MB). Maximum size is 10MB.`
        );
      }

      const secretData: SecretData = {
        id,
        vault,
        expiresAt,
        maxViews,
        viewCount: 0,
        createdAt: new Date().toISOString(),
      };

      const filePath = path.join(this.SECRETS_DIR, `${id}.json`);
      console.log('Writing secret to file:', filePath);
      
      await fs.writeFile(filePath, JSON.stringify(secretData, null, 2));
      console.log('Secret created successfully');

      return { success: true, id };
    } catch (error) {
      console.error('Error in createSecret:', error);
      throw error;
    }
  }

  async getSecret(id: string): Promise<SecretResponseDto> {
    await this.ensureSecretsDir();

    const filePath = path.join(this.SECRETS_DIR, `${id}.json`);

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const secretData: SecretData = JSON.parse(fileContent);

      // Check if expired
      if (new Date() > new Date(secretData.expiresAt)) {
        await fs.unlink(filePath);
        throw new NotFoundException('Secret has expired');
      }

      // Check if max views exceeded
      if (secretData.viewCount >= secretData.maxViews) {
        await fs.unlink(filePath);
        throw new NotFoundException('Secret has been viewed maximum times');
      }

      // Increment view count
      secretData.viewCount += 1;

      // If this is the last allowed view, we'll delete after returning
      const shouldDelete = secretData.viewCount >= secretData.maxViews;

      if (!shouldDelete) {
        // Update view count if not deleting
        await fs.writeFile(filePath, JSON.stringify(secretData, null, 2));
      }

      const response: SecretResponseDto = {
        vault: secretData.vault,
        viewCount: secretData.viewCount,
        maxViews: secretData.maxViews,
        expiresAt: secretData.expiresAt,
        isLastView: shouldDelete,
      };

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
        throw new NotFoundException('Secret not found or already destroyed');
      }
      throw error;
    }
  }

  async deleteSecret(id: string): Promise<{ success: boolean; message: string }> {
    await this.ensureSecretsDir();

    const filePath = path.join(this.SECRETS_DIR, `${id}.json`);

    try {
      await fs.unlink(filePath);
      return { success: true, message: 'Secret destroyed' };
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException('Secret not found');
      }
      throw error;
    }
  }

  async cleanupExpiredSecrets(): Promise<{ success: boolean; cleaned: number }> {
    await this.ensureSecretsDir();

    const files = await fs.readdir(this.SECRETS_DIR);
    let cleaned = 0;

    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const filePath = path.join(this.SECRETS_DIR, file);
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

    return { success: true, cleaned };
  }
}