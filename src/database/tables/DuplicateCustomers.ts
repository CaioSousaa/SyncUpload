import { Column, Generated, PrimaryColumn } from 'typeorm';

export class DuplicateCustomers {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  numberOcurrences: number;
}
