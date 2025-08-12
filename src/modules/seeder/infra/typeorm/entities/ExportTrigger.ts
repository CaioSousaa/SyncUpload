import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class ExportTrigger {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  updated_at: Date;

  @Column({ default: false })
  active: boolean;
}
