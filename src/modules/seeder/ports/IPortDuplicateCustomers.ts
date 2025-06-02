import { DuplicateCustomers } from 'src/database/tables/DuplicateCustomers';

export interface IDuplicateCustomersPortRepository {
  create(duplicateCustomers: DuplicateCustomers): Promise<DuplicateCustomers>;
}
