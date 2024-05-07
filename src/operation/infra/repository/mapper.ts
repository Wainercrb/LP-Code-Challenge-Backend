import { Operation } from '@/operation/domain/operation';
import { OperationType } from '@/operation/domain/operation-type';
import { SequelizeOperation } from '@/shared/infra/database/models/Operation';

export const toSingleOperation = ({ id, type, cost }: SequelizeOperation): Operation => {
  return {
    id,
    cost,
    type: type as OperationType,
  };
};

export const toOperationList = (rows: SequelizeOperation[]): Operation[] => {
  return rows.map(toSingleOperation);
};
