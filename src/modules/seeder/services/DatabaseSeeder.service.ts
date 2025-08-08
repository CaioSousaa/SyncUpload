import { BadRequestException, Inject } from '@nestjs/common';
import { Customer } from '../domain/entities/Customer';
import { ICustomerPortRepository } from '../ports/IPortCustomer';
import { faker } from '@faker-js/faker';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositories';
import { AppResponse } from '../../../adapters/responses/AppResponse';
import { DatabaseSeederDTO } from '../dto/DatabaseSeederDTO';

export class DatabaseSeeder {
  constructor(
    @Inject(CustomerRepository)
    private readonly customersRepository: ICustomerPortRepository,
  ) {}

  async execute({ insertionsSize }: DatabaseSeederDTO): Promise<AppResponse> {
    let batchSize = 1000;
    const allCustomers: Customer[] = [];

    if (!insertionsSize) {
      throw new BadRequestException('the insertions size field is mandatory');
    }

    if (insertionsSize < 1000) batchSize = insertionsSize;

    for (let i = 0; i < insertionsSize; i++) {
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

    return new AppResponse('success', 200, allCustomers.length);
  }
}
