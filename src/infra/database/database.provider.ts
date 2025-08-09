import 'dotenv';
import { Customers } from 'src/modules/seeder/infra/typeorm/entities/Customers';
import { DataSource } from 'typeorm';

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
        entities: [Customers],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
