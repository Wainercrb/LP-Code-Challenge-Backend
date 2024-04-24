import { RecordRow, SequelizeRecord } from '@infrastructure/database/models/Record';
import { DeleteRecordRepository } from '@domain/services/record/DeleteRecordService';

export class SequelizeDeleteRecordRepository implements DeleteRecordRepository {
  async delete(recordId: number): Promise<RecordRow | null> {
    const body = {
      isDeleted: true,
    };

    await SequelizeRecord.update(body, {
      where: { id: recordId },
    });

    const updatedRecord = await SequelizeRecord.findOne({ where: { id: recordId } });

    if (!updatedRecord) return updatedRecord;

    return {
      amount: updatedRecord.amount,
      date: updatedRecord.date,
      id: updatedRecord.id,
      isDeleted: updatedRecord.isDeleted,
      user_id: updatedRecord.user_id,
      operation_id: updatedRecord.operation_id,
      operation_response: updatedRecord.operation_response,
    };
  }
}
