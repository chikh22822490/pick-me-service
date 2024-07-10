import { Provider, Scope } from '@nestjs/common';
import {
  CreateRideUseCase,
  FileStorageService,
  RideRepository,
} from '@pick-me-core';

const CreateRideProvider: Provider<CreateRideUseCase> = {
  provide: CreateRideUseCase,
  inject: ['FileStorageService', 'RideRepository'],
  useFactory: (
    fileStorageService: FileStorageService,
    rideRepository: RideRepository
  ) => {
    return new CreateRideUseCase(fileStorageService, rideRepository);
  },
  scope: Scope.REQUEST,
};

export { CreateRideProvider };
