import { Provider, Scope } from '@nestjs/common';
import { FileStorageService, SetUserAvatarUseCase } from '@pick-me-core';

const SetUserAvatarProvider: Provider<SetUserAvatarUseCase> = {
  provide: SetUserAvatarUseCase,
  inject: ['FileStorageService'],
  useFactory: (fileStorageService: FileStorageService) => {
    return new SetUserAvatarUseCase(fileStorageService);
  },
  scope: Scope.REQUEST,
};

export { SetUserAvatarProvider };
