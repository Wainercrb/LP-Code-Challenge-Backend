import axios from 'axios';
import { config } from '@/shared/infra/config';
import { logger } from '@/shared/infra/logger/logger';
import { Error400, Error404 } from '@/shared/infra/errors/handler';
import { RecordRepository } from '@/records/domain/record-repository';
import { Record } from '@/records/domain/record';
import { UserRepository } from '@/users/domain/user-repository';
import { OperationRepository } from '@/operations/domain/operation-repository';
import { OperationType } from '@/operations/domain/operation-type';
import { sequelize } from '@/shared/infra/database/sequelize';

type OperationRecord<K extends string | number | symbol, T> = { [P in K]: T };

export class Create {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly userRepository: UserRepository,
    private readonly operationRepository: OperationRepository,
  ) {}

  async execute(userID: number, operationId: number, valueA: number, valueB: number): Promise<Record | null> {
    logger.info(`[GetAllOperations] - starting start`);

    const foundUser = await this.userRepository.getOneById(userID);

    if (!foundUser) throw new Error404('We cannot find a user for this new record.');

    const foundOperation = await this.operationRepository.getOneById(operationId);

    if (!foundOperation) throw new Error404('We cannot find an operation for this new record.');

    const newUserBalance = foundUser.balance - foundOperation.cost;

    if (newUserBalance <= 0) throw new Error400('Your balance is negative');

    const operationResult = await this.makeOperation(foundOperation.type as OperationType, valueA, valueB);
    const operationResultAsNumber = typeof operationResult === 'number' ? operationResult : 0

    if (foundOperation.type !== OperationType.random_string && !isFinite(operationResultAsNumber)) {
      throw new Error400('Error processing your operation, please check the values');
    }

    const isDeleted = false;
    const nowDateTime = new Date();

    const operationResponse = JSON.stringify({
      operationType: foundOperation.type,
      prevBalance: foundUser.balance,
      newBalance: newUserBalance,
      valueA,
      valueB,
      operationResult: operationResultAsNumber,
    });

    const { createdRecord } = await sequelize.transaction(async (t) => {
      const createdRecord = await this.recordRepository.createRecord(
        userID,
        foundOperation.id,
        operationResultAsNumber,
        operationResponse,
        isDeleted,
        nowDateTime,
        t,
      );
      const affectedCount = await this.userRepository.updateBalanceById(userID, newUserBalance, t);

      return {
        createdRecord,
        affectedCount,
      };
    });

    logger.info(`[GetUserUseCase] - end`);

    return createdRecord;
  }

  private makeOperation(operationType: OperationType, valueA: number, valueB: number) {
    const operations: OperationRecord<OperationType, (a: number, b: number) => number | Promise<never[]>> = {
      addition: this.makeAddition,
      division: this.makeDivision,
      multiplication: this.makeMultiplication,
      square_root: this.makeSquareRoot,
      subtraction: this.makeSubtraction,
      random_string: this.makeRandomString,
    };

    const currentOperation = operations[operationType];

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
    const response = await axios.post(config.server.randomOrgApiUrl, {
      jsonrpc: '2.0',
      method: 'generateStrings',
      params: {
        apiKey: config.server.randomOrgApiKey,
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
