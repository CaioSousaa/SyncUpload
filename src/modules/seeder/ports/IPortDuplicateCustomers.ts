import { DuplicateCustomers } from '../infra/http/typeorm/entities/DuplicateCustomers';

export interface IDuplicateCustomersPortRepository {
  create(duplicateCustomers: DuplicateCustomers): Promise<DuplicateCustomers>;
}
