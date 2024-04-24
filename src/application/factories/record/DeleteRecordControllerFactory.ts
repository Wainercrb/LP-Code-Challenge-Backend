import { SequelizeDeleteRecordRepository } from '@domain/repositories/record/SequelizeDeleteRecordRepository';
import { SequelizeFindRecordRepository } from '@domain/repositories/record/SequelizeFindRecordRepository';
import { DeleteRecordService } from '@domain/services/record/DeleteRecordService';
import { FindRecordService } from '@domain/services/record/FindRecordService';
import { DeleteRecordController } from '@infrastructure/controller/record/DeleteRecordController';

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
