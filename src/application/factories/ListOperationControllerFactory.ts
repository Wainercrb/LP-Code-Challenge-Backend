import { SequelizeListOperationRepository } from '@domain/repositories/SequelizeListOperationRepository';
import { ListOperationService } from '@domain/services/ListOperationService';
import { ListOperationController } from '@infrastructure/controller/ListOperationController';

export class ListOperationControllerFactory {
  static make() {
    const repository = new SequelizeListOperationRepository();
    const service = new ListOperationService(repository);
    const controller = new ListOperationController(service);

    return controller;
  }
}
