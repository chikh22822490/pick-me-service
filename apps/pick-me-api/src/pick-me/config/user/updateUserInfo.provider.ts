import { Provider, Scope } from '@nestjs/common';
import { UserRepository, UpdateUserInfoUseCase } from '@pick-me-core';

const UpdateUserInfoProvider: Provider<UpdateUserInfoUseCase> = {
  provide: UpdateUserInfoUseCase,
  inject: ['UserRepository'],
  useFactory: (UserRepository: UserRepository) => {
    return new UpdateUserInfoUseCase(UserRepository);
  },
  scope: Scope.REQUEST,
};

export { UpdateUserInfoProvider };
