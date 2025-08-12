import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty()
  id: number;

  @ApiProperty()
  acronym: string;

  @ApiProperty()
  stateName: string;

  @ApiProperty()
  regionName: string;

  constructor({ id, acronym, stateName, regionName }: Location) {
    Object.assign(this, {
      id,
      acronym,
      stateName,
      regionName,
    });
  }

  static create({ id, acronym, regionName, stateName }: Location) {
    const location = new Location({
      id,
      acronym,
      regionName,
      stateName,
    });

    return location;
  }
}
