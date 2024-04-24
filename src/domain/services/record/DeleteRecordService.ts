import { RecordRow } from '@infrastructure/database/models/Record';

export interface DeleteRecordRepository {
  delete(recordId: number): Promise<RecordRow | null>;
}

export class DeleteRecordService {
  constructor(private repository: DeleteRecordRepository) {}

  async delete(recordId: number) {
    return this.repository.delete(recordId);
  }
}
