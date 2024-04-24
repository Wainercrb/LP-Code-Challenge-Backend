import { FindRecordRepository } from '@domain/services/record/FindRecordService';
import { RecordRow, SequelizeRecord } from '@infrastructure/database/models/Record';

export class SequelizeFindRecordRepository implements FindRecordRepository {
  async find(recordId: number): Promise<RecordRow | null> {
    const foundRecord = await SequelizeRecord.findOne({
      where: {
        id: recordId,
      },
    });

    return foundRecord ? foundRecord : null;
  }
}
