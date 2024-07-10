import { RideRepository } from '@pick-me-core';
import { DbClient, RideRepositoryImpl } from '@pick-me-datasource';
import { Provider, Scope } from '@nestjs/common';

export const RideRepositoryProvider: Provider<RideRepository> = {
  provide: 'RideRepository',
  useFactory: (dbClient: DbClient) => {
    return new RideRepositoryImpl(dbClient);
  },
  inject: [DbClient],
  scope: Scope.REQUEST,
};
