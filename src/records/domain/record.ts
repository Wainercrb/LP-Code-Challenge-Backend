import { Operation } from '@/operations/domain/operation';
import { User } from '@/users/domain/user';

export abstract class Record {
  constructor(
    readonly id: number,
    readonly user: User | null,
    readonly operation: Operation | null,
    readonly amount: number,
    readonly isDeleted: boolean,
    readonly date: Date,
    readonly operationResponse: string,
  ) {
    this.id = id;
    this.user = user;
    this.operation = operation;
    this.amount = amount;
    this.isDeleted = isDeleted;
    this.date = date;
    this.operationResponse = operationResponse;
  }
}
