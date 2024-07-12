import { Provider, Scope } from '@nestjs/common';
import {
  CreateReservationUseCase,
  ReservationRepository,
} from '@pick-me-core';

const CreateReservationProvider: Provider<CreateReservationUseCase> = {
  provide: CreateReservationUseCase,
  inject: ['ReservationRepository'],
  useFactory: (
    ReservationRepository: ReservationRepository
  ) => {
    return new CreateReservationUseCase(ReservationRepository);
  },
  scope: Scope.REQUEST,
};

export { CreateReservationProvider };
