export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  OTHER = 'other'
}

export const MIME_TYPE_MAPPING: Record<string, MediaType> = {
  // Images
  'image/jpeg': MediaType.IMAGE,
  'image/jpg': MediaType.IMAGE,
  'image/png': MediaType.IMAGE,
  'image/gif': MediaType.IMAGE,
  'image/webp': MediaType.IMAGE,
  'image/heic': MediaType.IMAGE,
  'image/heif': MediaType.IMAGE,
  'image/tiff': MediaType.IMAGE,
  'image/bmp': MediaType.IMAGE,
  'image/svg+xml': MediaType.IMAGE,
  'image/avif': MediaType.IMAGE,

  // Videos
  'video/mp4': MediaType.VIDEO,
  'video/mov': MediaType.VIDEO,
  'video/avi': MediaType.VIDEO,
  'video/mkv': MediaType.VIDEO,
  'video/webm': MediaType.VIDEO,
  'video/flv': MediaType.VIDEO,
  'video/wmv': MediaType.VIDEO,
  'video/m4v': MediaType.VIDEO,
  'video/3gp': MediaType.VIDEO,
  'video/quicktime': MediaType.VIDEO,

  // Audio
  'audio/mpeg': MediaType.AUDIO,
  'audio/mp3': MediaType.AUDIO,
  'audio/wav': MediaType.AUDIO,
  'audio/flac': MediaType.AUDIO,
  'audio/aac': MediaType.AUDIO,
  'audio/ogg': MediaType.AUDIO,
  'audio/m4a': MediaType.AUDIO,
  'audio/webm': MediaType.AUDIO,

  // Documents
  'application/pdf': MediaType.DOCUMENT,
  'text/plain': MediaType.DOCUMENT,
  'application/msword': MediaType.DOCUMENT,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': MediaType.DOCUMENT,
};

export function getMediaTypeFromMimeType(mimeType: string): MediaType {
  return MIME_TYPE_MAPPING[mimeType] || MediaType.OTHER;
}