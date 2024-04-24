import { SequelizeListRecordRepository } from '@domain/repositories/record/SequelizeListRecordRepository';
import { ListRecordService } from '@domain/services/record/ListRecordService';
import { ListRecordController } from '@infrastructure/controller/record/ListRecordController';

export class ListRecordControllerFactory {
  static make() {
    const repository = new SequelizeListRecordRepository();
    const service = new ListRecordService(repository);
    const controller = new ListRecordController(service);

    return controller;
  }
}
