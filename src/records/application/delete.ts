import { RecordRepository } from '@/records/domain/record-repository';
import { logger } from '@/shared/infra/logger/logger';

export class Delete {
  constructor(private readonly recordRepository: RecordRepository) {}

  async execute(id: number): Promise<[affectedCount: number]> {
    logger.info(`[GetAllOperations] - starting start`);

    const affectedCount = await this.recordRepository.deleteById(id);

    logger.info(`[GetUserUseCase] - end`);

    return affectedCount;
  }
}
