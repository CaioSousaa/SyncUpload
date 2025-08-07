import { Controller, Post } from '@nestjs/common';
import { DatabaseSeeder } from '../../../services/DatabaseSeeder.service';
import { AppResponse } from 'src/adapters/responses/AppResponse';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';

@ApiTags('seeder')
@Controller('seeder')
export class SeederControler {
  constructor(private readonly seederService: DatabaseSeeder) {}

  @Post()
  @ApiCreatedResponse({
    description: '100k users inserted in database',
    type: Customer,
  })
  async run(): Promise<AppResponse> {
    return await this.seederService.execute();
  }
}
