import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyCSV } from 'src/modules/csv/domain/entities/BodyCSV';
import { ExportDatabaseToCSVService } from 'src/modules/csv/services/ExportDatabaseToCSV.service';

@ApiTags('csv')
@Controller('csv')
export class CSVController {
  constructor(private exportDatabaseToCSV: ExportDatabaseToCSVService) {}

  @Post()
  @ApiBody({ type: BodyCSV })
  @ApiResponse({
    status: 201,
    description: 'csv generated successfully',
  })
  @ApiResponse({
    status: 406,
    description: 'there are no customers in the database',
  })
  async run() {
    return this.exportDatabaseToCSV.execute();
  }
}
