import { FindOperationRepository } from '@domain/services/FindOperationService';
import { OperationRow, SequelizeOperation } from '@infrastructure/database/models/Operation';

export class SequelizeFindOperationRepository implements FindOperationRepository {
  async find(operationId: number): Promise<OperationRow | null> {
    const operation = await SequelizeOperation.findOne({
      where: {
        id:operationId 
      }
    });

    return operation ? operation : null
  }
}
