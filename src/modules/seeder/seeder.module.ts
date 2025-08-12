import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { customersProvider, exportTriggerProvider } from './constants.provider';
import { DatabaseSeeder } from './services/DatabaseSeeder.service';
import { SeederControler } from './infra/http/controller/seeder.controller';
import { CustomerRepository } from './infra/typeorm/repositories/CustomersRepository';
import { ExportTriggerRepository } from './infra/typeorm/repositories/ExportTriggerRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [SeederControler],
  providers: [
    ...customersProvider,
    ...exportTriggerProvider,
    DatabaseSeeder,
    CustomerRepository,
    ExportTriggerRepository,
  ],
})
export class SeederModule {}
