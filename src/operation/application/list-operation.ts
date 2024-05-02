import { Operation } from '@/operation/domain/operation';

// Repositories
import { OperationRepository } from '@/operation/domain/operation-repository';

// Shared
import { logger } from '@/shared/infra/logger/logger';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination';

export class ListOperation {
  constructor(private readonly operationRepository: OperationRepository) {}

  async execute(pagination: PaginationProps): Promise<PaginationResult<Operation[]>> {
    logger.info(`[ListOperation] - Start listing operations`);

    const operations = await this.operationRepository.getAll(pagination);

    logger.info(`[ListOperation] - Successfully listed operations, count: ${operations.totalItems}`);

    return operations;
  }
}
