import { Module } from '@nestjs/common';
import { CSVController } from '../infra/http/csv.controller';
import { ExportDatabaseToCSVService } from './services/ExportDatabaseToCSV.service';
import { CSVRepository } from 'src/external/repositories/CSVRepositories';
import { customersProvider } from '../seeder/constants.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CSVController],
  providers: [...customersProvider, ExportDatabaseToCSVService, CSVRepository],
})
export class CSVModule {}
