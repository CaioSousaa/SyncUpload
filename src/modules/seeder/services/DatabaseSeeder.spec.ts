import { DatabaseSeeder } from './DatabaseSeeder.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositories';
import { databaseSeederMock } from '../mocks/DatabaseSeederMock';
import { afterEach } from 'node:test';
import { faker } from '@faker-js/faker';
import { Customer } from '../domain/entities/Customer';

describe('DatabaseSeederService', () => {
  let databaseSeeder: DatabaseSeeder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseSeeder,
        {
          provide: CustomerRepository,
          useValue: databaseSeederMock,
        },
      ],
    }).compile();

    databaseSeeder = module.get<DatabaseSeeder>(DatabaseSeeder);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('it must be possible to populate a database', async () => {
    expect(databaseSeeder).toBeDefined();
  });

  it('It should be possible to create 10 users at once', async () => {
    const tenUsers: Customer[] = [];

    for (let i = 0; i < 10; i++) {
      tenUsers.push({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        created_at: new Date(),
      });
    }

    databaseSeederMock.create.mockReturnValue(Promise.resolve(tenUsers));

    const response = await databaseSeeder.execute();

    expect(response.statusCode).toEqual(200);
    expect(response.message).toEqual('success');
    expect(response.length).toEqual(10);
  });
});
