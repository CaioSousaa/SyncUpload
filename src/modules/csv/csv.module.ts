import { Module } from '@nestjs/common';
import { ExportDatabaseToCSVService } from './services/ExportDatabaseToCSV.service';
import {
  customersProvider,
  exportTriggerProvider,
} from '../seeder/constants.provider';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ExportTriggerRepository } from '../seeder/infra/typeorm/repositories/ExportTriggerRepository';
import { CustomerRepository } from '../seeder/infra/typeorm/repositories/CustomersRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    ...customersProvider,
    ...exportTriggerProvider,
    ExportDatabaseToCSVService,
    CustomerRepository,
    ExportTriggerRepository,
  ],
})
export class CSVModule {}
