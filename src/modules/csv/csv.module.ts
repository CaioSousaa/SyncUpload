import { Module } from '@nestjs/common';
import { CSVController } from './infra/http/controller/csv.controller';
import { ExportDatabaseToCSVService } from './services/ExportDatabaseToCSV.service';
import {
  customersProvider,
  exportTriggerProvider,
} from '../seeder/constants.provider';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CustomerRepository } from './infra/typeorm/repositories/CustomersRepositories';
import { ExportTriggerRepository } from '../seeder/infra/typeorm/repositories/ExportTriggerRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [CSVController],
  providers: [
    ...customersProvider,
    ...exportTriggerProvider,
    ExportDatabaseToCSVService,
    CustomerRepository,
    ExportTriggerRepository,
  ],
})
export class CSVModule {}
