import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { customersProvider } from './constants.provider';
import { DatabaseSeeder } from './services/DatabaseSeeder.service';
import { SeederControler } from './infra/seeder.controller';
import { CustomerRepository } from 'src/external/repositories/CustomersRepositories';

@Module({
  imports: [DatabaseModule],
  controllers: [SeederControler],
  providers: [...customersProvider, DatabaseSeeder, CustomerRepository],
})
export class SeederModule {}
