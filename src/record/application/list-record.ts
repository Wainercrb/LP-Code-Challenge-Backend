import { Record } from '@/record/domain/record';

// Repositories
import { RecordRepository } from '@/record/domain/record-repository';

// Shared
import { logger } from '@/shared/infra/logger/logger';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination';

export class ListRecord {
  constructor(private readonly recordRepository: RecordRepository) {}

  async execute(userID: number, pagination: PaginationProps): Promise<PaginationResult<Record[]>> {
    logger.info(`[ListRecord] - Start listing records for user with ID: ${userID}`);

    const records = await this.recordRepository.listRecord(userID, pagination);

    logger.info(`[GetUserUseCase] - end`);
    logger.info(`[ListRecord] - Successfully listed records for user with ID: ${userID}`);

    return records;
  }
}
