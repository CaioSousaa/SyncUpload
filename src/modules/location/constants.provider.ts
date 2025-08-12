import { DataSource } from 'typeorm';
import { Location } from './infra/http/typeorm/entities/Location';

export const locationProvider = [
  {
    provide: 'LOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Location),
    inject: ['DATA_SOURCE'],
  },
];
