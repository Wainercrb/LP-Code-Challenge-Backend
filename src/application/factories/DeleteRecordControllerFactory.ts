import { SequelizeDeleteRecordRepository } from '@domain/repositories/SequelizeDeleteRecordRepository';
import { SequelizeFindRecordRepository } from '@domain/repositories/SequelizeFindRecordRepository';
import { DeleteRecordService } from '@domain/services/DeleteRecordService';
import { FindRecordService } from '@domain/services/FindRecordService';
import { DeleteRecordController } from '@infrastructure/controller/DeleteRecordController';

export class DeleteRecordControllerFactory {
  static make() {
    const findRecordRepository = new SequelizeFindRecordRepository();
    const deleteRecordRepository = new SequelizeDeleteRecordRepository();

    const findRecordService = new FindRecordService(findRecordRepository);
    const deleteRecordService = new DeleteRecordService(deleteRecordRepository);

    const controller = new DeleteRecordController(deleteRecordService, findRecordService);

    return controller;
  }
}
