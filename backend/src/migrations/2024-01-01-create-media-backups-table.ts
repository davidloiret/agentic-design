import { Migration } from '@mikro-orm/migrations';

export class Migration20240101CreateMediaBackupsTable extends Migration {

  async up(): Promise<void> {
    const sql = `
      CREATE TABLE "media_backups" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "user_id" VARCHAR(255) NOT NULL,
        "device_id" VARCHAR(255) NOT NULL,
        "original_name" VARCHAR(500) NOT NULL,
        "file_name" VARCHAR(500) NOT NULL,
        "mime_type" VARCHAR(100) NOT NULL,
        "media_type" VARCHAR(50) NOT NULL,
        "size" BIGINT NOT NULL,
        "width" INTEGER,
        "height" INTEGER,
        "duration" INTEGER,
        "fps" NUMERIC(10,2),
        "bitrate" INTEGER,
        "codec" VARCHAR(100),
        "audio_codec" VARCHAR(100),
        "sample_rate" INTEGER,
        "channels" INTEGER,
        "original_created_at" TIMESTAMP(3) NOT NULL,
        "original_modified_at" TIMESTAMP(3) NOT NULL,
        "storage_key" VARCHAR(1000) NOT NULL,
        "storage_provider" VARCHAR(50) NOT NULL DEFAULT 'local',
        "cdn_url" VARCHAR(2000),
        "thumbnail_url" VARCHAR(2000),
        "preview_url" VARCHAR(2000),
        "checksum_md5" VARCHAR(32) NOT NULL,
        "checksum_sha256" VARCHAR(64) NOT NULL,
        "exif_data" JSONB,
        "gps_latitude" NUMERIC(10,8),
        "gps_longitude" NUMERIC(11,8),
        "altitude" NUMERIC(10,2),
        "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
        "error_message" TEXT,
        "processing_started_at" TIMESTAMP(3),
        "processing_completed_at" TIMESTAMP(3),
        "deleted_from_device" BOOLEAN NOT NULL DEFAULT false,
        "deleted_from_device_at" TIMESTAMP(3),
        "is_public" BOOLEAN NOT NULL DEFAULT false,
        "shared_with" JSONB,
        "album_id" VARCHAR(255),
        "tags" JSONB,
        "metadata" JSONB,
        CONSTRAINT "fk_media_backups_user_id"
          FOREIGN KEY ("user_id")
          REFERENCES "users" ("id")
          ON DELETE CASCADE
      );

      CREATE INDEX "idx_media_backups_user_id" ON "media_backups" ("user_id");
      CREATE INDEX "idx_media_backups_device_id" ON "media_backups" ("device_id");
      CREATE INDEX "idx_media_backups_status" ON "media_backups" ("status");
      CREATE INDEX "idx_media_backups_media_type" ON "media_backups" ("media_type");
      CREATE INDEX "idx_media_backups_created_at" ON "media_backups" ("created_at" DESC);
      CREATE INDEX "idx_media_backups_checksums" ON "media_backups" ("checksum_md5", "checksum_sha256");
      CREATE INDEX "idx_media_backups_album_id" ON "media_backups" ("album_id");
      CREATE INDEX "idx_media_backups_gps" ON "media_backups" ("gps_latitude", "gps_longitude");
      CREATE INDEX "idx_media_backups_tags" ON "media_backups" USING GIN ("tags");
    `;

    this.addSql(sql);
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "media_backups"');
  }

}