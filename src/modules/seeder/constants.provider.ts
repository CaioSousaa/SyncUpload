import { DataSource } from 'typeorm';
import { Customers } from '../../database/tables/Customers';
import { DuplicateCustomers } from 'src/database/tables/DuplicateCustomers';

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
