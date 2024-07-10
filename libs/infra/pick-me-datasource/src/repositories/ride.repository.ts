import { RideRepository } from '@pick-me-core';
import { DbClient } from '../dbClient';

export class RideRepositoryImpl implements RideRepository {
  constructor(private readonly _prismaClient: DbClient) {}

  async createRide(
    id: string,
    userId: string,
    carModel: string,
    availableSeats: number,
    dateTime: Date,
    price: number,
    departure: string,
    destination: string,
    email: string,
    phone: string,
    whatsapp: string
  ): Promise<void> {
    await this._prismaClient.ride.create({
      data: {
        id: id,
        userId: userId,
        carModel: carModel,
        dateTime: dateTime,
        price: price,
        departure: departure,
        destination: destination,
        availableSeats: availableSeats,
        email: email,
        phone: phone,
        whatsapp: whatsapp,
      },
    });
  }
}
