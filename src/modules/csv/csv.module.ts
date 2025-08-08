import { Module } from '@nestjs/common';
import { CSVController } from './infra/http/controller/csv.controller';
import { ExportDatabaseToCSVService } from './services/ExportDatabaseToCSV.service';
import { customersProvider } from '../seeder/constants.provider';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CustomerRepository } from './infra/typeorm/repositories/CustomersRepositories';

@Module({
  imports: [DatabaseModule],
  controllers: [CSVController],
  providers: [
    ...customersProvider,
    ExportDatabaseToCSVService,
    CustomerRepository,
  ],
})
export class CSVModule {}
