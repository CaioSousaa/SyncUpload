import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryColumn()
  id: number;

  @Column()
  acronym: string;

  @Column()
  stateName: string;

  @Column()
  regionName: string;
}
