import { SequelizeListOperationRepository } from '@domain/repositories/operation/SequelizeListOperationRepository';
import { ListOperationService } from '@domain/services/operation/ListOperationService';
import { ListOperationController } from '@infrastructure/controller/operation/ListOperationController';

export class ListOperationControllerFactory {
  static make() {
    const repository = new SequelizeListOperationRepository();
    const service = new ListOperationService(repository);
    const controller = new ListOperationController(service);

    return controller;
  }
}
