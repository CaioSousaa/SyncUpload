import { Customer } from '../seeder/domain/entities/Customer';

export interface IPortCSV {
  findMany(): Promise<Customer[]>;
}
