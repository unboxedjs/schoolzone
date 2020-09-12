import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  providers: [BusService, TripService],
  controllers: [BusController, TripController]
})
export class TravelModule {}
