import { OperationRepository } from '@/operations/domain/operation-repository';
import { logger } from '@/shared/infra/logger/logger';
import { Operation } from '@/operations/domain/operation';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination'

export class List {
  constructor(private readonly operationRepository: OperationRepository) {}

  async execute(pagination: PaginationProps): Promise<PaginationResult<Operation[]>> {
    logger.info(`[GetAllOperations] - starting start`);

    const operations = await this.operationRepository.getAll(pagination);

    logger.info(`[GetUserUseCase] - end`);

    return operations;
  }
}
