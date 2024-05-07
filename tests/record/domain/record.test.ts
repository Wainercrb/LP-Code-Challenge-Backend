import { Record } from '../../../src/record/domain/record';
import { User } from '../../../src/user/domain/user';
import { Operation } from '../../../src/operation/domain/operation';
import { OperationType } from '../../../src/operation/domain/operation-type';
import { Role } from '../../../src/user/domain/user-role';

class TestRecord extends Record {
  constructor(
    id: number,

    user: User | null,
    operation: Operation | null,
    amount: number,
    isDeleted: boolean,
    date: Date,
    operationResponse: string,
  ) {
    super(id, user, operation, amount, isDeleted, date, operationResponse);
  }
}

class TestUser extends User {
  constructor(id: number, username: string, password: string, role: Role, balance: number) {
    super(id, username, password, role, balance);
  }
}

class TestOperation extends Operation {
  constructor(id: number, type: OperationType, cost: number) {
    super(id, type, cost);
  }
}

describe('[record]', () => {
  it('should create a record instance with provided values', () => {
    const id = 1;
    const recordUser = new TestUser(1, 'test', 'test', Role.admin, 1);
    const recordOperation = new TestOperation(1, 'addition' as OperationType, 100);
    const amount = 100;
    const isDeleted = false;
    const date = new Date();
    const operationResponse = '{}';
    const operation = new TestRecord(id, recordUser, recordOperation, amount, isDeleted, date, operationResponse);

    expect(operation.id).toEqual(id);
    expect(operation.user).toEqual(recordUser);
    expect(operation.operation).toEqual(recordOperation);
    expect(operation.amount).toEqual(amount);
    expect(operation.isDeleted).toEqual(isDeleted);
    expect(operation.date).toEqual(date);
    expect(operation.operationResponse).toEqual(operationResponse);
  });
});
