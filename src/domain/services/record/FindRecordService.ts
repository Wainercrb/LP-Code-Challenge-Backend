import { RecordRow } from '@infrastructure/database/models/Record';

export interface FindRecordRepository {
  find(operationId: number): Promise<RecordRow | null>;
}

export class FindRecordService {
  constructor(private repository: FindRecordRepository) {}

  async find(recordId: number) {
    return this.repository.find(recordId);
  }
}
