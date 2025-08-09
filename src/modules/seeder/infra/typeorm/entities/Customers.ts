import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Customers {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  city: string;

  @Column()
  job: string;

  @Column()
  salary_in_cents: number;

  @Column()
  cpf: string;

  @Column()
  created_at: Date;
}
