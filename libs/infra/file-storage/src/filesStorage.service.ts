import { BlobServiceClient } from '@azure/storage-blob';
import { Readable as NodeReadable } from 'stream';

import { FileStorageService, ReadableFile } from '@pick-me-core';
import { createReadStream } from 'fs';

export class AzureBlobFileStorageService implements FileStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor(connectionString: string, containerName: string) {
    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    this.containerName = containerName;
    this.ensureContainerExists();
  }

  private async ensureContainerExists(): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    if (!(await containerClient.exists())) {
      await containerClient.create();
    }
  }

  public async downloadFile(fileId: string): Promise<NodeReadable> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    const blobClient = containerClient.getBlobClient(fileId);
    const downloadBlockBlobResponse = await blobClient.download();
    const readableStream = NodeReadable.from(
      downloadBlockBlobResponse.readableStreamBody
    );
    return readableStream;
  }

  public async deleteFile(fileId: string): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    const blobClient = containerClient.getBlobClient(fileId);
    await blobClient.delete();
  }

  public async uploadFile(fileId: string, file: ReadableFile): Promise<void> {
    const stream = createReadStream(file.path);
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    const blockBlobClient = containerClient.getBlockBlobClient(fileId);

    await blockBlobClient.uploadStream(stream, file.size);
  }
}
