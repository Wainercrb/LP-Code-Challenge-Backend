import { OperationType } from '@/operation/domain/operation-type';

export abstract class Operation {
  constructor(
    readonly id: number,
    readonly type: OperationType,
    readonly cost: number,
  ) {
    this.id = id;
    this.type = type;
    this.cost = cost;
  }
}
