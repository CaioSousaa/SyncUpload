import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { customersProvider } from './constants.provider';
import { DatabaseSeeder } from './services/DatabaseSeeder.service';
import { SeederControler } from './infra/http/controller/seeder.controller';
import { CustomerRepository } from './infra/typeorm/repositories/CustomersRepositories';

@Module({
  imports: [DatabaseModule],
  controllers: [SeederControler],
  providers: [...customersProvider, DatabaseSeeder, CustomerRepository],
})
export class SeederModule {}
