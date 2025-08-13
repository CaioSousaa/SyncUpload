import { ApiProperty } from '@nestjs/swagger';

export class ExportTrigger {
  @ApiProperty()
  id: string;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  active: boolean;

  constructor({ id, updated_at, active = false }: ExportTrigger) {
    Object.assign(this, {
      id,
      updated_at,
      active,
    });
  }
}
