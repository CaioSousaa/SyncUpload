import { Module } from '@nestjs/common';
import { LocationsController } from './infra/http/controllers/locations.controller';
import { locationProvider } from './constants.provider';
import { CreateLocationsService } from './services/CreateLocations.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { LocationRepository } from './infra/http/typeorm/repositories/LocationRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [LocationsController],
  providers: [...locationProvider, CreateLocationsService, LocationRepository],
})
export class LocationModule {}
