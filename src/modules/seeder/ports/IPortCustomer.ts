import { Customer } from '../domain/entities/Customer';

export interface ICustomerPortRepository {
  create(customer: Customer): Promise<Customer>;
}
