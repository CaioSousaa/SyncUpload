import { Inject } from '@nestjs/common';
import { Customer } from '../domain/entities/Customer';
import { ICustomerPortRepository } from '../ports/IPortCustomer';
import { faker } from '@faker-js/faker';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositories';
import { AppResponse } from '../../../adapters/responses/AppResponse';

export class DatabaseSeeder {
  constructor(
    @Inject(CustomerRepository)
    private readonly customersRepository: ICustomerPortRepository,
  ) {}

  async execute(): Promise<AppResponse> {
    const batchSize = 1000;
    const customersInserts = 100000;
    const allCustomers: Customer[] = [];
    let length = 0;

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

    length = allCustomers.length;

    return new AppResponse('success', 200, length);
  }
}
