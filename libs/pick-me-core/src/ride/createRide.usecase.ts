import {
  FileAlreadyExistsException,
  InfrastructureException,
  InvalidCommandException,
  InvalidDocumentException,
} from '../common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { RideRepository } from './ride.repository';
import { FileStorageService, ReadableFile } from '../common';

export class CreateRideUseCase {
  private readonly _fileStorageService: FileStorageService;
  private readonly _rideRepository: RideRepository;
  constructor(
    fileStorageService: FileStorageService,
    rideRepository: RideRepository
  ) {
    this._fileStorageService = fileStorageService;
    this._rideRepository = rideRepository;
  }

  async execute(command: CreateRideCommand): Promise<string> {
    if (!command.userId) {
      throw new InvalidCommandException('User Id should be provided');
    }
    if (!command.carModel) {
      throw new InvalidCommandException('Car Model should be provided');
    }
    if (!command.availableSeats) {
      throw new InvalidCommandException('Available Seats should be provided');
    }
    if (!command.carImage) {
      throw new InvalidCommandException('Car Image should be provided');
    }
    if (!command.dateTime) {
      throw new InvalidCommandException(
        'Ride Date and Time should be provided'
      );
    }
    if (!command.price) {
      throw new InvalidCommandException('Ride Price should be provided');
    }
    if (!command.departure) {
      throw new InvalidCommandException(
        'Ride Departure Location should be provided'
      );
    }
    if (!command.destination) {
      throw new InvalidCommandException(
        'Ride Destination Location should be provided'
      );
    }
    try {
      const rideId: string = uuidv4();
      await this._fileStorageService.uploadFile(rideId, command.carImage);
      try {
        await this._rideRepository.createRide(
          rideId,
          command.userId,
          command.carModel,
          command.availableSeats,
          command.dateTime,
          command.price,
          command.departure,
          command.destination,
          command.email,
          command.phone,
          command.whatsapp
        );
        return rideId;
      } catch (error) {
        await this._fileStorageService.deleteFile(rideId);
        throw new InfrastructureException(error);
      }
    } catch (uploadError) {
      if (uploadError instanceof FileAlreadyExistsException) {
        throw new InvalidDocumentException(uploadError.message);
      } else throw uploadError;
    }
  }
}

class CreateRideCommand {
  userId: string;
  carModel: string;
  availableSeats: number;
  dateTime: Date;
  price: number;
  departure: string;
  destination: string;
  email: string;
  phone: string;
  whatsapp: string;
  carImage: ReadableFile;
  constructor(
    userId: string,
    carModel: string,
    availableSeats: number,
    dateTime: Date,
    price: number,
    departure: string,
    destination: string,

    email: string,
    phone: string,
    whatsapp: string,
    carImage: ReadableFile
  ) {
    this.userId = userId;
    this.carModel = carModel;
    this.availableSeats = availableSeats;
    this.dateTime = dateTime;
    this.price = price;
    this.departure = departure;
    this.destination = destination;
    this.email = email;
    this.phone = phone;
    this.whatsapp = whatsapp;
    this.carImage = carImage;
  }
}
