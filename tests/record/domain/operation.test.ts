import { Operation } from '../../../src/operation/domain/operation';
import { OperationType } from '../../../src/operation/domain/operation-type';

class TestOperation extends Operation {
  constructor(id: number, type: OperationType, cost: number) {
    super(id, type, cost);
  }
}

describe('[operation]', () => {
  it('should create an operation instance with provided values', () => {
    const id = 1;
    const type = 'addition' as OperationType;
    const cost = 100;

    const operation = new TestOperation(id, type, cost);

    expect(operation.id).toEqual(id);
    expect(operation.type).toEqual(type);
    expect(operation.cost).toEqual(cost);
  });
});
