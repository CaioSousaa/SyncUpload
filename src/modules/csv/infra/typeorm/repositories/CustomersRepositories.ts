import { Inject } from '@nestjs/common';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';
import { Customers } from 'src/modules/seeder/infra/typeorm/entities/Customers';
import { ICustomerPortRepository } from 'src/modules/seeder/ports/IPortCustomer';
import { Repository } from 'typeorm';

export class CustomerRepository implements ICustomerPortRepository {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private customersRepository: Repository<Customers>,
  ) {}

  async create(customer: Customer[]): Promise<void> {
    const customers = this.customersRepository.create(customer);
    await this.customersRepository.save(customers);
  }

  async findMany(): Promise<Customer[]> {
    const allCustomers = await this.customersRepository.find();

    return allCustomers;
  }
}
