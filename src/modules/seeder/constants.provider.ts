import { DataSource } from 'typeorm';
import { Customers } from './infra/typeorm/entities/Customers';
import { ExportTrigger } from './infra/typeorm/entities/ExportTrigger';

export const customersProvider = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customers),
    inject: ['DATA_SOURCE'],
  },
];

export const exportTriggerProvider = [
  {
    provide: 'EXPORT_TRIGGERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExportTrigger),
    inject: ['DATA_SOURCE'],
  },
];
