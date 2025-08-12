import { Inject } from '@nestjs/common';
import { IPortLocation } from 'src/modules/location/ports/IPortLocation';
import { Repository } from 'typeorm';
import { Location } from '../entities/Location';

export class LocationRepository implements IPortLocation {
  constructor(
    @Inject('LOCATION_REPOSITORY')
    private locationRepository: Repository<Location>,
  ) {}

  async findMany(): Promise<Location[]> {
    const locations = await this.locationRepository.find();

    return locations;
  }

  async create({
    acronym,
    id,
    regionName,
    stateName,
  }: Location): Promise<void> {
    const newLocation = this.locationRepository.create({
      acronym,
      id,
      regionName,
      stateName,
    });

    await this.locationRepository.save(newLocation);
  }
}
