import { Operation } from '@/operation/domain/operation';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination';

export interface OperationRepository {
  getAll(pagination: PaginationProps): Promise<PaginationResult<Operation[]>>;
  getOneById(id: number): Promise<Operation | null>;
}
