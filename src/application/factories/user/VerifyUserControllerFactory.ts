import { SequelizeFindUserRepository } from '@domain/repositories/user/SequelizeFindUserRepository';
import { FindUserService } from '@domain/services/user/FindUserService';
import { VerifyUserController } from '@infrastructure/controller/user/VerifyUserController';

export class VerifyUserControllerFactory {
  static make() {
    const repository = new SequelizeFindUserRepository();
    const service = new FindUserService(repository);
    const controller = new VerifyUserController(service);

    return controller;
  }
}
