import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import LocationRepository from './location.repository';
@Module({
  imports: [],
  controllers: [LocationController],
  providers: [LocationRepository, LocationService]
})
export class LocationModule {}
