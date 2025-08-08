import { ApiProperty } from '@nestjs/swagger';

export class BodyCSV {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  created_at: Date;
}
