import { SignOutUserController } from '@infrastructure/controller/user/SignOutUserController';

export class SignOutUserControllerFactory {
  static make() {
    const controller = new SignOutUserController();

    return controller;
  }
}
