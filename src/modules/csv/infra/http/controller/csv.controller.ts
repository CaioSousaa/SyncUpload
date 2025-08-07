import { Controller, Post } from '@nestjs/common';
import { ExportDatabaseToCSVService } from 'src/modules/csv/services/ExportDatabaseToCSV.service';

@Controller('csv')
export class CSVController {
  constructor(private exportDatabaseToCSV: ExportDatabaseToCSVService) {}

  @Post()
  async run() {
    return this.exportDatabaseToCSV.execute();
  }
}
