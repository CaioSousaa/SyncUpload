import { Inject } from '@nestjs/common';
import { IPortExportTrigger } from 'src/modules/seeder/ports/IPortExportTrigger';
import { Repository } from 'typeorm';
import { ExportTrigger } from '../entities/ExportTrigger';

export class ExportTriggerRepository implements IPortExportTrigger {
  constructor(
    @Inject('EXPORT_TRIGGERS_REPOSITORY')
    private exportTriggerRepository: Repository<ExportTrigger>,
  ) {}

  public async update(mode: boolean): Promise<void> {
    const sql =
      'SELECT id, active, updated_at FROM export_trigger WHERE id = $1';
    const exportTriggerIsExists = await this.exportTriggerRepository.query(
      sql,
      [process.env.ID],
    );

    if (exportTriggerIsExists.length === 0) {
      const exportTrigger = this.exportTriggerRepository.create({
        id: process.env.ID,
        updated_at: new Date(),
      });

      await this.exportTriggerRepository.save(exportTrigger);
    }

    let value = false;

    if (mode === true) {
      value = true;
    }

    this.exportTriggerRepository
      .createQueryBuilder()
      .update(ExportTrigger)
      .set({ updated_at: new Date(), active: value })
      .where('id = :id', { id: process.env.ID })
      .execute();
  }
}
