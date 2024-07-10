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
} from './pick-me/config';
import { RideController, UserController } from './pick-me/controllers';

@Module({
  imports: [],
  controllers: [RideController, UserController],
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
  ],
})
export class AppModule {}
