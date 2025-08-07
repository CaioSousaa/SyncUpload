import { Controller, Post } from '@nestjs/common';
import { DatabaseSeeder } from '../../../services/DatabaseSeeder.service';
import { AppResponse } from 'src/adapters/responses/AppResponse';

@Controller('seeder')
export class SeederControler {
  constructor(private readonly seederService: DatabaseSeeder) {}

  @Post()
  async run(): Promise<AppResponse> {
    return await this.seederService.execute();
  }
}
