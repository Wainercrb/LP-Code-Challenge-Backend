import { SequelizeFindUserRepository } from '@domain/repositories/user/SequelizeFindUserRepository';
import { FindUserService } from '@domain/services/user/FindUserService';
import { ProfileUserController } from '@infrastructure/controller/user/ProfileUserController';

export class ProfileUserControllerFactory {
  static make() {
    const repository = new SequelizeFindUserRepository();
    const service = new FindUserService(repository);
    const controller = new ProfileUserController(service);

    return controller;
  }
}
