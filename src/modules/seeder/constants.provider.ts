import { DataSource } from 'typeorm';
import { Customers } from './infra/typeorm/entities/Customers';

export const customersProvider = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customers),
    inject: ['DATA_SOURCE'],
  },
];
