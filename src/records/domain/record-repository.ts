import { Record } from '@/records/domain/record';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination';
import { Transaction } from 'sequelize';

export interface RecordRepository {
  listRecord(userID: number, pagination: PaginationProps): Promise<PaginationResult<Record[]>>;
  createRecord(
    userID: number,
    operationID: number,
    amount: number,
    operationResponse: string,
    isDeleted: boolean,
    data: Date,
    t?: Transaction,
  ): Promise<Record | null>;

  getOneById(id: number, t?: Transaction): Promise<Record | null>;
  deleteById(id: number, t?: Transaction): Promise<[affectedCount: number]>;
}
