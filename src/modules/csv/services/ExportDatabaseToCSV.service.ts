import {
  Inject,
  Injectable,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';
import { createObjectCsvStringifier } from 'csv-writer';
import { AppResponse } from 'src/adapters/responses/AppResponse';
import { ExportTriggerRepository } from 'src/modules/seeder/infra/typeorm/repositories/ExportTriggerRepository';
import { IPortExportTrigger } from 'src/modules/seeder/ports/IPortExportTrigger';
import { ICustomerPortRepository } from 'src/modules/seeder/ports/IPortCustomer';
import { CustomerRepository } from 'src/modules/seeder/infra/typeorm/repositories/CustomersRepository';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class ExportDatabaseToCSVService {
  private s3: S3Client;

  constructor(
    @Inject(CustomerRepository)
    private readonly customerRepository: ICustomerPortRepository,
    @Inject(ExportTriggerRepository)
    private readonly exportTriggerRepository: IPortExportTrigger,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_KEY_ACCESS!,
        secretAccessKey: process.env.AWS_SECRET_KEY_ACCESS!,
      },
    });
  }

  public async execute(): Promise<AppResponse> {
    try {
      const header = [
        { id: 'id', title: 'ID' },
        { id: 'email', title: 'Email' },
        { id: 'name', title: 'Name' },
        { id: 'seniority', title: 'Seniority' },
        { id: 'salary_in_cents', title: 'Salary in cents' },
        { id: 'city', title: 'City' },
        { id: 'stateAcronym', title: 'State Acronym' },
      ];

      const customers = await this.customerRepository.findCustomersByFilters();

      if (customers.length === 0) {
        throw new NotAcceptableException(
          'there are no customers in the database',
        );
      }

      const csvStringifier = createObjectCsvStringifier({ header });
      const csvContent =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(customers);

      const fileName = `customers-${Date.now()}.csv`;

      await this.s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET!,
          Key: fileName,
          Body: Buffer.from(csvContent, 'utf-8'),
          ContentType: 'text/csv',
          ACL: 'public-read',
        }),
      );

      await this.exportTriggerRepository.update(false);

      const fileUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      return new AppResponse(
        'success',
        200,
        customers.length,
        fileUrl,
        fileName,
      );
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
