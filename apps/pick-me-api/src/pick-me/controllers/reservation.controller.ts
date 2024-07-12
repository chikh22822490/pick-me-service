import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReservationUseCase } from '@pick-me-core';
import { CreateReservationDTO } from '../models/reservation';
import { AuthenticatedUser, Authorize } from '../auth';
import { ReservationQueriesHandler } from '../queries';
import { DisplayReservationDto } from '../models';

@Authorize()
@Controller('/reservations')
@ApiTags('reservations')
export class ReservationController {
  constructor(
    private readonly _createReservation: CreateReservationUseCase,
    private readonly _reservationQueriesHandler: ReservationQueriesHandler
  ) {}

  @Get('/')
  async getUserReservations(
    @AuthenticatedUser() user
  ): Promise<DisplayReservationDto[]> {
    const reservations =
      await this._reservationQueriesHandler.getUserReservations(user.id);
    return reservations;
  }

  @Post('/create')
  async createReservation(
    @Body() reservation: CreateReservationDTO,
    @AuthenticatedUser() user
  ): Promise<string> {
    const reservationId = await this._createReservation.execute({
      userId: user.id,
      ...reservation,
    });
    return reservationId;
  }
}
