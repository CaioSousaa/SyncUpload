import { Controller, Post } from '@nestjs/common';
import { DatabaseSeeder } from '../services/DatabaseSeeder.service';

@Controller('seeder')
export class SeederControler {
  constructor(private readonly seederService: DatabaseSeeder) {}

  @Post()
  async run() {
    try {
      return await this.seederService.execute();
    } finally {
      console.log('Five Customers created!');
    }
  }
}
