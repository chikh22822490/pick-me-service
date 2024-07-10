import {
  FileAlreadyExistsException,
  InvalidCommandException,
  InvalidDocumentException,
  FileStorageService,
  ReadableFile,
} from '../common';

export class SetUserAvatarUseCase {
  private readonly _fileStorageService: FileStorageService;
  constructor(fileStorageService: FileStorageService) {
    this._fileStorageService = fileStorageService;
  }

  async execute(setUserAvatarCommand: SetUserAvatarCommand): Promise<void> {
    if (!setUserAvatarCommand.userId) {
      throw new InvalidCommandException('User Id should be provided');
    }
    if (!setUserAvatarCommand.file) {
      throw new InvalidCommandException('An image file should be provided');
    }
    try {
      await this._fileStorageService.uploadFile(
        '/avatars/' + setUserAvatarCommand.userId,
        setUserAvatarCommand.file
      );
    } catch (uploadError) {
      if (uploadError instanceof FileAlreadyExistsException) {
        throw new InvalidDocumentException(uploadError.message);
      } else throw uploadError;
    }
  }
}

export class SetUserAvatarCommand {
  readonly userId: string;
  readonly file: ReadableFile;

  constructor(userId: string, file: ReadableFile) {
    this.userId = userId;
    this.file = file;
  }
}
