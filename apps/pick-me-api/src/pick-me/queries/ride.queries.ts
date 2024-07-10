import { Inject, Injectable } from '@nestjs/common';
import { FileStorageService } from '@pick-me-core';
import { ReadonlyDbClient } from '@pick-me-datasource';
import { DisplayRideDto } from '../models';
import streamToBase64 from '../common/streamToBase64';

@Injectable()
export class RideQueriesHandler {
  constructor(
    private readonly _readonlyDbClient: ReadonlyDbClient,
    @Inject('FileStorageService')
    private readonly _fileStorageService: FileStorageService
  ) {}

  async getAllRides(): Promise<DisplayRideDto[]> {
    const rides = (await this._readonlyDbClient._db.ride.findMany()).map(
      (ride) => ({ ...ride, carImage: '' })
    );
    await Promise.all(
      rides.map(async (ride) => {
        try {
          const carImage = await this._fileStorageService.downloadFile(ride.id);
          if (carImage) {
            const carImageBase64String = await streamToBase64(carImage);
            ride.carImage = carImageBase64String;
          }
        } catch (error) {
          ride.carImage = undefined;
        }
      })
    );
    return rides;
  }

  async getUserRides(userId: string): Promise<DisplayRideDto[]> {
    const rides = (
      await this._readonlyDbClient._db.ride.findMany({
        where: {
          userId: userId,
        },
      })
    ).map((ride) => ({ ...ride, carImage: '' }));
    await Promise.all(
      rides.map(async (ride) => {
        try {
          const carImage = await this._fileStorageService.downloadFile(ride.id);
          if (carImage) {
            const carImageBase64String = await streamToBase64(carImage);
            ride.carImage = carImageBase64String;
          }
        } catch (error) {
          ride.carImage = undefined;
        }
      })
    );
    return rides;
  }
}
