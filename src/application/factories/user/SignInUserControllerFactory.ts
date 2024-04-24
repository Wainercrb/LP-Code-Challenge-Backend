import { SequelizeSignInUserRepository } from '@domain/repositories/user/SequelizeSignInUserRepository';
import { SignInUserService } from '@domain/services/user/SignInUserService';
import { SignInUserController } from '@infrastructure/controller/user/SignInUserController';

export class SignInUserControllerFactory {
  static make() {
    const repository = new SequelizeSignInUserRepository();
    const service = new SignInUserService(repository);
    const controller = new SignInUserController(service);

    return controller;
  }
}
