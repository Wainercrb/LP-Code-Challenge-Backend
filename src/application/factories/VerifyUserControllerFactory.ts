import { SequelizeFindUserRepository } from '@domain/repositories/SequelizeFindUserRepository';
import { FindUserService } from '@domain/services/FindUserService';
import { VerifyUserController } from '@infrastructure/controller/VerifyUserController';

export class VerifyUserControllerFactory {
  static make() {
    const repository = new SequelizeFindUserRepository();
    const service = new FindUserService(repository);
    const controller = new VerifyUserController(service);

    return controller;
  }
}
