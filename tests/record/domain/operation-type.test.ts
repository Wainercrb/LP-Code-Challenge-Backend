import { OperationType } from '../../../src/operation/domain/operation-type';

describe('[operation-type]', () => {
  it('should define operation enums correctly', () => {
    expect(OperationType.addition).toEqual('addition');
    expect(OperationType.division).toEqual('division');
    expect(OperationType.multiplication).toEqual('multiplication');
    expect(OperationType.random_string).toEqual('random_string');
    expect(OperationType.square_root).toEqual('square_root');
    expect(OperationType.subtraction).toEqual('subtraction');
  });
});
