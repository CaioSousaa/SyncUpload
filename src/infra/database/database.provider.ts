import 'dotenv';
import { Location } from 'src/modules/location/infra/http/typeorm/entities/Location';
import { Customers } from 'src/modules/seeder/infra/typeorm/entities/Customers';
import { ExportTrigger } from 'src/modules/seeder/infra/typeorm/entities/ExportTrigger';
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
        entities: [Customers, ExportTrigger, Location],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
