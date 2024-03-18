import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import LocationRepository from './location.repository';
import { LoggerService } from '../logger/logger.service';
@Module({
  imports: [],
  controllers: [LocationController],
  providers: [LocationRepository, LocationService, LoggerService]
})
export class LocationModule {}
