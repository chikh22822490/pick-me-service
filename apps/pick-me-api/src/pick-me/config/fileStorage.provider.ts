import { AzureBlobFileStorageService } from '@file-storage';
import { FileStorageService } from '@pick-me-core';
import { Provider, Scope } from '@nestjs/common';

const FileStorageProvider: Provider<FileStorageService> = {
  provide: 'FileStorageService',
  useFactory: () => {
    return new AzureBlobFileStorageService(
      process.env.AZURE_BLOB_CONNECTION_STRING,
      process.env.AZURE_BLOB_CONTAINER_NAME
    );
  },
  scope: Scope.REQUEST,
};

export { FileStorageProvider };
