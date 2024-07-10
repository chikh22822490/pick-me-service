import { Provider, Scope } from '@nestjs/common';
import { UserRepository, UpdateUserCredentialsUseCase } from '@pick-me-core';

const UpdateUserCredentialsProvider: Provider<UpdateUserCredentialsUseCase> = {
  provide: UpdateUserCredentialsUseCase,
  inject: ['UserRepository'],
  useFactory: (UserRepository: UserRepository) => {
    return new UpdateUserCredentialsUseCase(UserRepository);
  },
  scope: Scope.REQUEST,
};

export { UpdateUserCredentialsProvider };
