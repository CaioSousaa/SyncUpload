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
  created_at: Date;
}
