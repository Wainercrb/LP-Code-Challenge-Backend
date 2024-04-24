/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateRecordRepository } from '@domain/services/record/CreateRecordService';
import { RecordRow, SequelizeRecord } from '@infrastructure/database/models/Record';
import { Record } from '@domain/entities/Record/Record';

export class SequelizeCreateRecordRepository implements CreateRecordRepository {
  async create(record: Record): Promise<RecordRow> {
    const userSaved = await SequelizeRecord.create({
      operation_id: record.getOperationId(),
      user_id: record.getUserId(),
      amount: record.getAmount(),
      operation_response: record.getOperationResponse(),
      date: record.getDate(),
      isDeleted: record.getIsDeleted(),
    });

    return {
      id: userSaved.id,
      operation_id: userSaved.operation_id,
      user_id: userSaved.user_id,
      amount: userSaved.amount,
      operation_response: userSaved.operation_response,
      date: userSaved.date,
      isDeleted: userSaved.isDeleted,
    };
  }
}
