import 'dotenv';
import { DataSource } from 'typeorm';
import { Customers } from './tables/Customers';
import { DuplicateCustomers } from './tables/DuplicateCustomers';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [Customers, DuplicateCustomers],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
