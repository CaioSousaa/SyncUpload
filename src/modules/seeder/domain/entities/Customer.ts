export class Customer {
  id?: string;
  name: string;
  email: string;
  age: number;
  created_at: Date;

  constructor({ age, email, name, created_at }: Customer) {
    Object.assign(this, {
      name,
      email,
      age,
      created_at,
    });
  }

  static create({ age, email, name }: Customer) {
    const customer = new Customer({
      email,
      name,
      age,
      created_at: new Date(),
    });

    return customer;
  }
}
