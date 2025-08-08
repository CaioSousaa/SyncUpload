import { DatabaseSeeder } from './DatabaseSeeder.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositories';
import { databaseSeederMock } from '../mocks/DatabaseSeederMock';
import { afterEach } from 'node:test';
import { faker } from '@faker-js/faker';
import { Customer } from '../domain/entities/Customer';
import { AppResponse } from 'src/adapters/responses/AppResponse';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('it must be possible to populate a database', async () => {
    expect(databaseSeeder).toBeDefined();
  });

  it('it should be possible to create 10 users at once', async () => {
    const tenUsers: Customer[] = [];
    const inputMock = 10;

    const outputMock: AppResponse = {
      message: 'success',
      statusCode: 200,
      length: 10,
    };

    databaseSeederMock.create.mockReturnValue(Promise.resolve(inputMock));
    databaseSeederMock.create.mockReturnValue(Promise.resolve(outputMock));

    databaseSeederMock.create.mockReturnValue(Promise.resolve(tenUsers));

    const start = performance.now();

    const response = await databaseSeeder.execute({ insertionsSize: 10 });

    const duration = performance.now() - start;

    expect(response.statusCode).toEqual(200);
    expect(response.message).toEqual('success');
    expect(response.length).toEqual(10);
    expect(response).toEqual(outputMock);

    expect(databaseSeederMock.create).toHaveBeenCalled();
    expect(databaseSeederMock.create).toHaveBeenCalledTimes(1);
    expect(duration).toBeLessThan(500);
  });

  it('it should be possible to create 10000 users at once', async () => {
    const users: Customer[] = [];
    const inputMock = 10000;

    const outputMock: AppResponse = {
      message: 'success',
      statusCode: 200,
      length: 10000,
    };

    databaseSeederMock.create.mockReturnValue(Promise.resolve(inputMock));
    databaseSeederMock.create.mockReturnValue(Promise.resolve(outputMock));

    databaseSeederMock.create.mockReturnValue(Promise.resolve(users));

    const start = performance.now();

    const response = await databaseSeeder.execute({ insertionsSize: 10000 });

    const duration = performance.now() - start;

    expect(response.statusCode).toEqual(200);
    expect(response.message).toEqual('success');
    expect(response.length).toEqual(10000);
    expect(response).toEqual(outputMock);

    expect(databaseSeederMock.create).toHaveBeenCalled();
    expect(duration).toBeLessThan(2000);
  });

  it('it should be possible to create 50000 users at once', async () => {
    const users: Customer[] = [];
    const inputMock = 50000;

    const outputMock: AppResponse = {
      message: 'success',
      statusCode: 200,
      length: 50000,
    };

    databaseSeederMock.create.mockReturnValue(Promise.resolve(inputMock));
    databaseSeederMock.create.mockReturnValue(Promise.resolve(outputMock));

    databaseSeederMock.create.mockReturnValue(Promise.resolve(users));

    const start = performance.now();

    const response = await databaseSeeder.execute({ insertionsSize: 50000 });

    const duration = performance.now() - start;

    expect(response.statusCode).toEqual(200);
    expect(response.message).toEqual('success');
    expect(response.length).toEqual(50000);
    expect(response).toEqual(outputMock);

    expect(databaseSeederMock.create).toHaveBeenCalled();
    expect(duration).toBeLessThan(4500);
  });

  it('it should be possible to create 100000 users at once', async () => {
    const users: Customer[] = [];
    const inputMock = 100000;

    const outputMock: AppResponse = {
      message: 'success',
      statusCode: 200,
      length: 100000,
    };

    databaseSeederMock.create.mockReturnValue(Promise.resolve(inputMock));
    databaseSeederMock.create.mockReturnValue(Promise.resolve(outputMock));

    databaseSeederMock.create.mockReturnValue(Promise.resolve(users));

    const start = performance.now();

    const response = await databaseSeeder.execute({ insertionsSize: 100000 });

    const duration = performance.now() - start;

    expect(response.statusCode).toEqual(200);
    expect(response.message).toEqual('success');
    expect(response.length).toEqual(100000);
    expect(response).toEqual(outputMock);

    expect(databaseSeederMock.create).toHaveBeenCalled();
    expect(duration).toBeLessThan(7000);
  });

  it('it should not be possible to run without an input', async () => {
    await expect(
      databaseSeeder.execute({ insertionsSize: undefined as any }),
    ).rejects.toThrow('the insertions size field is mandatory');

    expect(databaseSeederMock.create).not.toHaveBeenCalled();
  });
});
