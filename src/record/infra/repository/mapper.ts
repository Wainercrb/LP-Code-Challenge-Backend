import { Record as EntityRecord } from '@/record/domain/record';
import { SequelizeRecord } from '@/shared/infra/database/models/Record';
import { toSingleOperation } from '@/operation/infra/repository/mapper';
import { toSingleUser } from '@/user/infra/repository/mapper';

export const toSingleRecord = ({
  id,
  amount,
  isDeleted,
  date,
  user,
  operation,
  operation_response,
}: SequelizeRecord): EntityRecord => {
  return {
    id,
    amount,
    isDeleted,
    operationResponse: operation_response,
    user: user && toSingleUser(user),
    operation: operation && toSingleOperation(operation),
    date,
  };
};

export const toRecordList = (rows: SequelizeRecord[]): EntityRecord[] => {
  return rows.map(toSingleRecord);
};

export const filterRecordColumn: Record<string, string> = {
  username: 'user.username',
  role: 'user.role',
  type: 'operation.type',
  cost: 'operation.cost',
  date: 'date',
  amount: 'amount',
  response: 'operation_response',
};
