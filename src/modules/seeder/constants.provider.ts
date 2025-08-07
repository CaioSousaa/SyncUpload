import { DataSource } from 'typeorm';
import { Customers } from './infra/http/typeorm/entities/Customers';
import { DuplicateCustomers } from './infra/http/typeorm/entities/DuplicateCustomers';

export const customersProvider = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customers),
    inject: ['DATA_SOURCE'],
  },
];

export const duplicateCustomersProvider = [
  {
    provide: 'DUPLICATE_CUSTOMERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DuplicateCustomers),
    inject: ['DATA_SOURCE'],
  },
];
