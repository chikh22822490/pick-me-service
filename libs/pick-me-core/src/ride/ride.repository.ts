export interface RideRepository {
  createRide(
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
  ): Promise<void>;
}
