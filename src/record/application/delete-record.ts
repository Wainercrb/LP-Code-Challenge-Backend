import { RecordRepository } from '@/record/domain/record-repository';
import { logger } from '@/shared/infra/logger/logger';

export class DeleteRecord {
  constructor(private readonly recordRepository: RecordRepository) {}

  async execute(id: number): Promise<[affectedCount: number]> {
    logger.info(`[DeleteRecord] - Starting deletion of record with ID: ${id}`);

    const affectedCount = await this.recordRepository.deleteById(id);

    logger.info(`[DeleteRecord] - Successfully deleted record with ID: ${id}. Affected count: ${affectedCount}`);

    return affectedCount;
  }
}
