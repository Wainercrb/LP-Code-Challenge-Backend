import { RecordRepository } from '@/records/domain/record-repository';
import { logger } from '@/shared/infra/logger/logger';
import { Record } from '@/records/domain/record';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination';

export class List {
  constructor(private readonly recordRepository: RecordRepository) {}

  async execute(userId: number, pagination: PaginationProps): Promise<PaginationResult<Record[]>> {
    logger.info(`[GetAllOperations] - starting start`);

    const records = await this.recordRepository.listRecord(userId, pagination);

    logger.info(`[GetUserUseCase] - end`);

    return records;
  }
}
