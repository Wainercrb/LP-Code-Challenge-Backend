import { SequelizeFindUserRepository } from '@domain/repositories/SequelizeFindUserRepository';
import { FindUserService } from '@domain/services/FindUserService';
import { ProfileUserController } from '@infrastructure/controller/ProfileUserController';

export class ProfileUserControllerFactory {
  static make() {
    const repository = new SequelizeFindUserRepository();
    const service = new FindUserService(repository);
    const controller = new ProfileUserController(service);

    return controller;
  }
}
