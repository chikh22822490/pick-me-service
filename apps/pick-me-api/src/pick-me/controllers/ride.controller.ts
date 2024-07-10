import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRideUseCase, ReadableFile } from '@pick-me-core';
import { CreateRideDTO } from '../models/ride/createRide.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthenticatedUser, Authorize } from '../auth';
import { RideQueriesHandler } from '../queries';
import { DisplayRideDto } from '../models';

@Authorize()
@Controller('/ride')
@ApiTags('ride')
export class RideController {
  constructor(
    private readonly _createRide: CreateRideUseCase,
    private readonly _rideQueriesHandler: RideQueriesHandler
  ) {}

  @Get('/all')
  async getAllRides(): Promise<DisplayRideDto[]> {
    const rides = await this._rideQueriesHandler.getAllRides();
    return rides;
  }

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    })
  )
  async createRide(
    @UploadedFile('file') carImage: Express.Multer.File,
    @Body() ride: CreateRideDTO,
    @AuthenticatedUser() user
  ): Promise<string> {
    const formattedCarImage: ReadableFile = {
      originalName: carImage.originalname,
      mimetype: carImage.mimetype,
      size: carImage.size,
      path: carImage.path,
    };
    const rideId = await this._createRide.execute({
      userId: user.id,
      ...ride,
      dateTime: new Date(ride.dateTime),
      price: parseFloat(ride.price.toString()),
      availableSeats: parseFloat(ride.availableSeats.toString()),
      carImage: formattedCarImage,
    });
    return rideId;
  }

  @Get('/:userId/all')
  async getUserRides(
    @Param('userId') userId: string
  ): Promise<DisplayRideDto[]> {
    const rides = await this._rideQueriesHandler.getUserRides(userId);
    return rides;
  }
}
