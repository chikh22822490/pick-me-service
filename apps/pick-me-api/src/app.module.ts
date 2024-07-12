import { Module } from '@nestjs/common';
import {
  FileStorageProvider,
  DbClientProvider,
  ReadonlyDbClientProvider,
  UpdateUserCredentialsProvider,
  UpdateUserInfoProvider,
  SetUserAvatarProvider,
  CreateRideProvider,
  RideRepositoryProvider,
  UserRepositoryProvider,
  CreateReservationProvider,
  ReservationRepositoryProvider,
} from './pick-me/config';
import {
  ReservationController,
  RideController,
  UserController,
} from './pick-me/controllers';
import {
  ReservationQueriesHandler,
  RideQueriesHandler,
} from './pick-me/queries';

@Module({
  imports: [],
  controllers: [RideController, UserController, ReservationController],
  providers: [
    DbClientProvider,
    ReadonlyDbClientProvider,
    FileStorageProvider,
    RideRepositoryProvider,
    CreateRideProvider,
    UpdateUserCredentialsProvider,
    UpdateUserInfoProvider,
    UserRepositoryProvider,
    SetUserAvatarProvider,
    RideQueriesHandler,
    ReservationRepositoryProvider,
    CreateReservationProvider,
    ReservationQueriesHandler,
  ],
})
export class AppModule {}
