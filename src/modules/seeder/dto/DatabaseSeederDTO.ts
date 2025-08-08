import { ApiProperty } from '@nestjs/swagger';

export class DatabaseSeederDTO {
  @ApiProperty()
  insertionsSize: number;
}
