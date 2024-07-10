import { Readable } from 'stream';

export interface FileStorageService {
  uploadFile(fileId: string, file: ReadableFile): Promise<void>;
  downloadFile(fileId: string): Promise<Readable>;
  deleteFile(fileId: string): Promise<void>;
}

export type ReadableFile = {
  originalName: string;
  size: number;
  mimetype: string;
  path: string;
};
