import {
  InfrastructureException,
  InvalidCommandException,
} from '../common/exceptions';
import { UserRepository } from './user.repository';

export class UpdateUserInfoUseCase {
  readonly _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute(command: UpdateUserInfoCommand) {
    if (!command.userId) {
      throw new InvalidCommandException('User Id should be provided');
    }
    if (!command.firstName) {
      throw new InvalidCommandException('User Firstname should be provided');
    }
    if (!command.lastName) {
      throw new InvalidCommandException('User Lastname should be provided');
    }
    if (!command.email) {
      throw new InvalidCommandException(
        'User E-mail Adress should be provided'
      );
    }
    try {
      await this._userRepository.updateUserInfo(
        command.userId,
        command.firstName,
        command.lastName,
        command.email
      );
    } catch (error) {
      throw new InfrastructureException(error);
    }
  }
}

export class UpdateUserInfoCommand {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    email: string
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
