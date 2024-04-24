import { OperationRow } from '@infrastructure/database/models/Operation';
import { PaginationResult } from '@infrastructure/pagination/default.pagination';

export interface ListOperationRepository {
  list(
    page: number,
    size: number,
    criteria?: string,
    orderColumn?: string,
    orderDirection?: string,
  ): Promise<PaginationResult<OperationRow[]>>;
}

export class ListOperationService {
  constructor(private repository: ListOperationRepository) {}

  async list(page: number, size: number, criteria?: string, orderColumn?: string, orderDirection?: string) {
    return this.repository.list(page, size, criteria, orderColumn, orderDirection);
  }
}
