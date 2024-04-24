import { RecordRow } from '@infrastructure/database/models/Record';
import { PaginationResult } from '@infrastructure/pagination/default.pagination';

export interface ListRecordRepository {
  list(
    userId: number,
    page: number,
    size: number,
    criteria?: string,
    orderColumn?: string,
    orderDirection?: string,
  ): Promise<PaginationResult<RecordRow[]>>;
}

export class ListRecordService {
  constructor(private repository: ListRecordRepository) {}

  async list(
    userId: number,
    page: number,
    size: number,
    criteria?: string,
    orderColumn?: string,
    orderDirection?: string,
  ) {
    return this.repository.list(userId, page, size, criteria, orderColumn, orderDirection);
  }
}
