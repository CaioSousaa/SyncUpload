import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  job: string;

  @ApiProperty()
  salary_in_cents: number;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  created_at: Date;

  constructor({
    age,
    email,
    name,
    created_at,
    city,
    job,
    salary_in_cents,
    cpf,
  }: Customer) {
    Object.assign(this, {
      name,
      job,
      email,
      age,
      city,
      created_at,
      cpf,
      salary_in_cents,
    });
  }

  static create({
    age,
    email,
    name,
    city,
    job,
    salary_in_cents,
    cpf,
  }: Customer) {
    const customer = new Customer({
      email,
      salary_in_cents,
      cpf,
      name,
      job,
      age,
      city,
      created_at: new Date(),
    });

    return customer;
  }
}
