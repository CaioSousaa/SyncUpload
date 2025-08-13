import { Customer } from '../domain/entities/Customer';

export interface SelectedCustomers {
  id: string;
  email: string;
  name: string;
  seniority: string;
  salary_in_cents: number;
  city: string;
  stateAcronym: string;
}

export interface ICustomerPortRepository {
  create(customer: Customer[]): Promise<void>;
  findMany(): Promise<Customer[]>;
  findCustomersByFilters(): Promise<SelectedCustomers[]>;
}
