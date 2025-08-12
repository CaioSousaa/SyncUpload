import {
  Inject,
  Injectable,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IPortCSV } from 'src/modules/csv/ports/IPortCSV';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import { AppResponse } from 'src/adapters/responses/AppResponse';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositories';
import { ExportTriggerRepository } from 'src/modules/seeder/infra/typeorm/repositories/ExportTriggerRepository';
import { IPortExportTrigger } from 'src/modules/seeder/ports/IPortExportTrigger';

@Injectable()
export class ExportDatabaseToCSVService {
  constructor(
    @Inject(CustomerRepository) private readonly CustomerRepository: IPortCSV,
    @Inject(ExportTriggerRepository)
    private readonly exportTriggerRepository: IPortExportTrigger,
  ) {}

  async execute(): Promise<AppResponse> {
    try {
      const header = [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'age', title: 'Age' },
        { id: 'email', title: 'Email' },
        { id: 'city', title: 'City' },
        { id: 'job', title: 'Job' },
        { id: 'salary_in_cents', title: 'Salary in cents' },
        { id: 'cpf', title: 'Cpf' },
        { id: 'created_at', title: 'Created_at' },
      ];

      const customers = await this.CustomerRepository.findMany();

      if (customers.length === 0) {
        throw new NotAcceptableException(
          'there are no customers in the database',
        );
      }

      const csvWriter = createObjectCsvWriter({
        path: path.resolve(process.cwd(), 'customers.csv'),
        header: header,
      });

      await csvWriter.writeRecords(customers);

      await this.exportTriggerRepository.update(false);

      return new AppResponse('success');
    } catch (error) {
      console.error('Error exporting database to CSV:', error);
      if (error instanceof NotAcceptableException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while exporting the database to CSV',
      );
    }
  }
}
