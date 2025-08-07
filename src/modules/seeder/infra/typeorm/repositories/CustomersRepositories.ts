import { Inject } from '@nestjs/common';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';
import { ICustomerPortRepository } from 'src/modules/seeder/ports/IPortCustomer';
import { Repository } from 'typeorm';
import { Customers } from '../entities/Customers';

export class CustomerRepository implements ICustomerPortRepository {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private customersRepository: Repository<Customers>,
  ) {}

  async create(customer: Customer[]): Promise<void> {
    const customers = this.customersRepository.create(customer);
    await this.customersRepository.save(customers);
  }
}
