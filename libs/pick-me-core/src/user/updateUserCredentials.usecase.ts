import {
  InfrastructureException,
  InvalidCommandException,
} from '../common/exceptions';
import { UserRepository } from './user.repository';

export class UpdateUserCredentialsUseCase {
  readonly _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute(command: UpdateUserCredentialsCommand) {
    if (!command.userId) {
      throw new InvalidCommandException('User Id should be provided');
    }
    if (!command.newPassword) {
      throw new InvalidCommandException('New Password should be provided');
    }
    try {
      await this._userRepository.updateUserCredentials(
        command.userId,
        command.newPassword
      );
    } catch (error) {
      throw new InfrastructureException(error);
    }
  }
}

export class UpdateUserCredentialsCommand {
  userId: string;
  newPassword: string;
  constructor(userId: string, newPassword: string) {
    this.userId = userId;
    this.newPassword = newPassword;
  }
}
