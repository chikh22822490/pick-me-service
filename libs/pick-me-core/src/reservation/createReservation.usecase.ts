import {
  InfrastructureException,
  InvalidCommandException,
} from '../common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { ReservationRepository } from './reservation.repository';

export class CreateReservationUseCase {
  private readonly _ReservationRepository: ReservationRepository;
  constructor(
    ReservationRepository: ReservationRepository
  ) {
    this._ReservationRepository = ReservationRepository;
  }

  async execute(command: CreateReservationCommand): Promise<string> {
    if (!command.userId) {
      throw new InvalidCommandException('User Id should be provided');
    }
    if (!command.rideId) {
      throw new InvalidCommandException('Ride Id should be provided');
    }
    if (!command.bookedSeats) {
      throw new InvalidCommandException('Booked Seats should be provided');
    }
    try {
      const reservationId: string = uuidv4();
      await this._ReservationRepository.createReservation(
        reservationId,
        command.userId,
        command.rideId,
        command.bookedSeats
      );
      return reservationId;
    } catch (error) {
      throw new InfrastructureException(error);
    }
  }
}

class CreateReservationCommand {
  userId: string;
  rideId: string;
  bookedSeats: number;
  constructor(userId: string, rideId: string, bookedSeats: number) {
    this.userId = userId;
    this.rideId = rideId;
    this.bookedSeats = bookedSeats;
  }
}
