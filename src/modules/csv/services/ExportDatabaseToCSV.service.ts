import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { IPortCSV } from 'src/modules/csv/ports/IPortCSV';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import { CSVRepository } from 'src/modules/csv/infra/typeorm/repositories/CSVRepositories';
import { AppResponse } from 'src/adapters/responses/AppResponse';

@Injectable()
export class ExportDatabaseToCSVService {
  constructor(@Inject(CSVRepository) private csvRepository: IPortCSV) {}

  async execute(): Promise<AppResponse> {
    const header = [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'age', title: 'Age' },
      { id: 'email', title: 'Email' },
      { id: 'created_at', title: 'Created_at' },
    ];

    const customers = await this.csvRepository.findMany();

    if (customers.length === 0) {
      throw new NotAcceptableException(
        'there are no customers in the database',
      );
    }

    const csvWriter = createObjectCsvWriter({
      path: path.resolve(process.cwd(), 'customers.csv'),
      header: header,
    });

    csvWriter
      .writeRecords(customers)
      .then(() => {
        console.log('CSV generated');
      })
      .catch((error) => {
        console.log('Error', error);
      });

    return new AppResponse('success');
  }
}
