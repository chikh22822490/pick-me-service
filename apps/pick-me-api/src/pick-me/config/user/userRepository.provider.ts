import { UserRepository } from '@pick-me-core';
import { UserRepositoryImpl } from '@pick-me-datasource';
import { Provider, Scope } from '@nestjs/common';

export const UserRepositoryProvider: Provider<UserRepository> = {
  provide: 'UserRepository',
  useFactory: () => {
    return new UserRepositoryImpl();
  },
  scope: Scope.REQUEST,
};
