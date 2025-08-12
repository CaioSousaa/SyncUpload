import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Location } from 'src/modules/location/domain/entities/Location';
import { CreateLocationsService } from 'src/modules/location/services/CreateLocations.service';

@Controller('locations')
export class LocationsController {
  constructor(private createLocationsService: CreateLocationsService) {}

  @Post()
  @ApiBody({ type: Location })
  @ApiResponse({
    status: 200,
    description: 'locations created',
  })
  public createLocations() {
    return this.createLocationsService.execute();
  }
}
