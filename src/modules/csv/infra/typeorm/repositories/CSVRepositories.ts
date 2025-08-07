import { Inject } from '@nestjs/common';
import { IPortCSV } from 'src/modules/csv/ports/IPortCSV';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';
import { Customers } from 'src/modules/seeder/infra/typeorm/entities/Customers';
import { Repository } from 'typeorm';

export class CSVRepository implements IPortCSV {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private customersRepository: Repository<Customers>,
  ) {}

  async findMany(): Promise<Customer[]> {
    const allCustomers = await this.customersRepository.find();

    return allCustomers;
  }
}
