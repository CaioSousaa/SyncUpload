import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseSeeder } from '../../../services/DatabaseSeeder.service';
import { AppResponse } from 'src/adapters/responses/AppResponse';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';
import { DatabaseSeederDTO } from 'src/modules/seeder/dto/DatabaseSeederDTO';
import { ExportTrigger } from 'src/modules/seeder/domain/entities/ExportTrigger';

@ApiTags('seeder')
@Controller('seeder')
@ApiExtraModels(Customer, ExportTrigger)
export class SeederControler {
  constructor(private readonly seederService: DatabaseSeeder) {}

  @Post()
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        customer: { $ref: getSchemaPath(Customer) },
        exportTrigger: { $ref: getSchemaPath(ExportTrigger) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'bad request' })
  async run(@Body() data: DatabaseSeederDTO): Promise<AppResponse> {
    return await this.seederService.execute(data);
  }
}
