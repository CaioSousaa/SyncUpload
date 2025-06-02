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
    for (const _i of Array.from({ length: 5 })) {
      const customersBody = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
      };

      const customer = Customer.create({
        name: customersBody.name,
        email: customersBody.email,
        age: customersBody.age,
        created_at: new Date(),
      });

      await this.customersRepository.create(customer);

      console.log('customer is created');
    }
  }
}
