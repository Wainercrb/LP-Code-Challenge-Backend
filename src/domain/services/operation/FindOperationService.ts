import { OperationRow } from '@infrastructure/database/models/Operation';

export interface FindOperationRepository {
  find(operationId: number): Promise<OperationRow | null>;
}

export class FindOperationService {
  constructor(private repository: FindOperationRepository) {}

  async find(operationId: number) {
    return this.repository.find(operationId);
  }
}
