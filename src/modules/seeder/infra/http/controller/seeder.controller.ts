import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseSeeder } from '../../../services/DatabaseSeeder.service';
import { AppResponse } from 'src/adapters/responses/AppResponse';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';
import { DatabaseSeederDTO } from 'src/modules/seeder/dto/DatabaseSeederDTO';

@ApiTags('seeder')
@Controller('seeder')
export class SeederControler {
  constructor(private readonly seederService: DatabaseSeeder) {}

  @Post()
  @ApiBody({ type: Customer })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 400, description: 'bad request' })
  async run(@Body() data: DatabaseSeederDTO): Promise<AppResponse> {
    return await this.seederService.execute(data);
  }
}
