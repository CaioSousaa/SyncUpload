import { DuplicateCustomers } from '../infra/typeorm/entities/DuplicateCustomers';

export interface IDuplicateCustomersPortRepository {
  create(duplicateCustomers: DuplicateCustomers): Promise<DuplicateCustomers>;
}
