import { Inject, Injectable } from '@nestjs/common';
import { FileStorageService } from '@pick-me-core';
import { ReadonlyDbClient } from '@pick-me-datasource';
import { DisplayReservationDto } from '../models';
import streamToBase64 from '../common/streamToBase64';

@Injectable()
export class ReservationQueriesHandler {
  constructor(
    private readonly _readonlyDbClient: ReadonlyDbClient,
    @Inject('FileStorageService')
    private readonly _fileStorageService: FileStorageService
  ) {}

  async getUserReservations(userId: string): Promise<DisplayReservationDto[]> {
    const reservations = await this._readonlyDbClient._db.reservation.findMany({
      where: {
        userId: userId,
      },
      include: {
        ride: true,
      },
    });
    const formattedReservations = await Promise.all(
      reservations.map(async (reservation) => {
        try {
          const carImage = await this._fileStorageService.downloadFile(
            reservation.ride.id
          );
          if (carImage) {
            const carImageBase64String =
              'data:image/*;base64,' + (await streamToBase64(carImage));
            return {
              ...reservation,
              ride: {
                ...reservation.ride,
                carImage: carImageBase64String,
              },
            };
          }
        } catch (error) {
          return {
            ...reservation,
            ride: {
              ...reservation.ride,
              carImage: undefined,
            },
          };
        }
      })
    );
    return formattedReservations;
  }
}
