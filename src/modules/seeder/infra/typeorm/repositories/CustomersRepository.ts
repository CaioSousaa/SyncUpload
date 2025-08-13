import { Inject } from '@nestjs/common';
import { Customer } from 'src/modules/seeder/domain/entities/Customer';
import {
  ICustomerPortRepository,
  SelectedCustomers,
} from 'src/modules/seeder/ports/IPortCustomer';
import { Repository } from 'typeorm';
import { Customers } from '../entities/Customers';

export class CustomerRepository implements ICustomerPortRepository {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private customersRepository: Repository<Customers>,
  ) {}

  public async findMany(): Promise<Customer[]> {
    const allCustomers = await this.customersRepository.find();

    return allCustomers;
  }

  public async findCustomersByFilters(): Promise<SelectedCustomers[]> {
    const filter = `
      SELECT c.id, c.email, c.name, SPLIT_PART(c.job, '-', 2) as seniority, c.salary_in_cents, SPLIT_PART(c.city, '-', 1) AS city,  l.acronym AS stateAcronym
        FROM (
          SELECT * 
          FROM customers
          WHERE email LIKE '%@gmail%' AND salary_in_cents >= 600000 AND SPLIT_PART(job, '-', 2) IN ('Júnior', 'Sênior')
        ) AS c
        INNER JOIN (
          SELECT * 
          FROM location
          WHERE acronym IN ('CE', 'RS', 'SP', 'BA', 'MT', 'PR', 'PE', 'RJ')
        ) AS l
        ON SPLIT_PART(c.city, '-', 2) = l.acronym;
    `;

    const responseFilter = await this.customersRepository.query(filter);

    const selectedCustomers: SelectedCustomers[] = responseFilter.map(
      (row: any) => ({
        id: row.id,
        email: row.email,
        name: row.name,
        seniority: row.seniority,
        salary_in_cents: row.salary_in_cents,
        city: row.city,
        stateAcronym: row.stateacronym,
      }),
    );

    return selectedCustomers;
  }

  public async create(customer: Customer[]): Promise<void> {
    const customers = this.customersRepository.create(customer);
    await this.customersRepository.save(customers);
  }
}
