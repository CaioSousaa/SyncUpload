import { BadRequestException, Inject } from '@nestjs/common';
import { Customer } from '../domain/entities/Customer';
import { ICustomerPortRepository } from '../ports/IPortCustomer';
import { faker, fakerPT_BR } from '@faker-js/faker';
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
        name: fakerPT_BR.person.firstName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        city: `${fakerPT_BR.location.city()}-${fakerPT_BR.location.state({ abbreviated: true })}`,
        job: `${fakerPT_BR.person.jobType()}-${faker.helpers.arrayElement(['Júnior', 'Pleno', 'Sênior', 'Especialista'])}`,
        salary_in_cents: faker.number.int({ min: 120000, max: 1000000 }),
        cpf: fakerPT_BR.string.numeric('###.###.###-##'),
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
