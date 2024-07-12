import { ReservationRepository } from '@pick-me-core';
import { DbClient, ReservationRepositoryImpl } from '@pick-me-datasource';
import { Provider, Scope } from '@nestjs/common';

export const ReservationRepositoryProvider: Provider<ReservationRepository> = {
  provide: 'ReservationRepository',
  useFactory: (dbClient: DbClient) => {
    return new ReservationRepositoryImpl(dbClient);
  },
  inject: [DbClient],
  scope: Scope.REQUEST,
};
