export interface ReservationRepository {
  createReservation(
    reservationId: string,
    userId: string,
    rideId: string,
    bookedSeats: number
  ): Promise<void>;
}
