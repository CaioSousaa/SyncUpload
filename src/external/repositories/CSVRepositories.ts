import { Inject } from '@nestjs/common';
import { Customers } from 'src/database/tables/Customers';
import { IPortCSV } from 'src/modules/ports/IPortCSV';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';
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
