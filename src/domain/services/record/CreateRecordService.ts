import { OperationType } from '@domain/entities/Operation/Operation';
import { Record } from '@domain/entities/Record/Record';
import { ValidationError } from '@domain/errors/ValidationError';
import { OperationRow } from '@infrastructure/database/models/Operation';
import { RecordRow } from '@infrastructure/database/models/Record';
import { UserRow } from '@infrastructure/database/models/User';
import axios from 'axios';
import z from 'zod';

type OperationRecord<K extends string | number | symbol, T> = { [P in K]: T };

const ZodOperationPayload = z.object({
  valueA: z.number(),
  valueB: z.number(),
});

export interface CreateRecordRepository {
  create(record: Record): Promise<RecordRow>;
}

export class CreateRecordService {
  constructor(private repository: CreateRecordRepository) {}

  async create(user: UserRow, operation: OperationRow, newUserBalance: number, operationPayload?: object) {
    const output = await this.makeOperation(operation.type as OperationType, operationPayload);
    const amount = typeof output === 'number' ? output : 0;

    const operationResponse = {
      prevBalance: user.balance,
      operationType: operation.type,
      newUserBalance,
      output,
    };

    const newRecord = new Record(operation.id, user.id, amount, JSON.stringify(operationResponse), new Date(), false);

    return this.repository.create(newRecord);
  }

  private makeOperation(operationType: OperationType, operationPayload?: object) {
    const { valueA, valueB } = ZodOperationPayload.parse(operationPayload);

    const operations: OperationRecord<OperationType, (a: number, b: number) => number | Promise<never[]>> = {
      addition: this.makeAddition,
      division: this.makeDivision,
      multiplication: this.makeMultiplication,
      square_root: this.makeSquareRoot,
      subtraction: this.makeSubtraction,
      random_string: this.makeRandomString,
    };

    const currentOperation = operations[operationType];

    if (!currentOperation) return new ValidationError('Operation not found');

    return currentOperation(valueA, valueB);
  }

  private makeAddition(a: number, b: number) {
    return a + b;
  }

  private makeSubtraction(a: number, b: number) {
    return a - b;
  }

  private makeMultiplication(a: number, b: number) {
    return a * b;
  }

  private makeDivision(a: number, b: number) {
    return a / b;
  }

  private makeSquareRoot(a: number) {
    return Math.sqrt(a);
  }

  private async makeRandomString() {
    if (!process.env.RANDOM_ORG_API_URL) {
      return new ValidationError('Random string base URL not found');
    }
    const response = await axios.post(process.env.RANDOM_ORG_API_URL, {
      jsonrpc: '2.0',
      method: 'generateStrings',
      params: {
        apiKey: process.env.RANDOM_ORG_API_KEY,
        n: 5,
        length: 5,
        characters: 'abcdefghijklmnopqrstuvwxyz',
        replacement: true,
      },
      id: 42,
    });

    return response.data.result.random.data;
  }
}
