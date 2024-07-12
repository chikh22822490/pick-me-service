import { DisplayRideDto } from "../ride";

export class DisplayReservationDto {
  id: string;
  userId: string;
  bookedSeats: number;
  ride: DisplayRideDto
}
