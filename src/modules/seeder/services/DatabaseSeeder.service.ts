import { Inject } from '@nestjs/common';
import { Customer } from '../domain/entities/Customer';
import { ICustomerPortRepository } from '../ports/IPortCustomer';
import { faker } from '@faker-js/faker';
import { CustomerRepository } from 'src/external/repositories/CustomersRepositories';

export class DatabaseSeeder {
  constructor(
    @Inject(CustomerRepository)
    private readonly customersRepository: ICustomerPortRepository,
  ) {}

  async execute() {
    const batchSize = 1000;
    const customersInserts = 100000;
    const allCustomers: Customer[] = [];

    for (let i = 0; i < customersInserts; i++) {
      allCustomers.push({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        created_at: new Date(),
      });
    }

    for (let i = 0; i < allCustomers.length; i += batchSize) {
      const batch = allCustomers.slice(i, i + batchSize);
      await this.customersRepository.create(batch);
    }

    console.log('50k customers created in batches');
  }
}
