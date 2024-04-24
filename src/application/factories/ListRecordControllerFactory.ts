import { SequelizeListRecordRepository } from "@domain/repositories/SequelizeListRecordRepository";
import { ListRecordService } from "@domain/services/ListRecordService";
import { ListRecordController } from "@infrastructure/controller/ListRecordController";

export class ListRecordControllerFactory {
  static make() {
    const repository = new SequelizeListRecordRepository();
    const service = new ListRecordService(repository);
    const controller = new ListRecordController(service);

    return controller;
  }
}