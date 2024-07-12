import { ReservationRepository } from '@pick-me-core';
import { DbClient } from '../dbClient';

export class ReservationRepositoryImpl implements ReservationRepository {
  constructor(private readonly _prismaClient: DbClient) {}

  async createReservation(
    reservationId: string,
    userId: string,
    rideId: string,
    bookedSeats: number
  ): Promise<void> {
    await this._prismaClient.reservation.create({
      data: {
        id: reservationId,
        userId: userId,
        rideId: rideId,
        bookedSeats: bookedSeats,
      },
    });
    const { availableSeats: oldAvailablesSeats } =
      await this._prismaClient.ride.findUnique({
        where: {
          id: rideId,
        },
      });
    await this._prismaClient.ride.update({
      where: {
        id: rideId,
      },
      data: {
        availableSeats: oldAvailablesSeats - bookedSeats,
      },
    });
  }
}
