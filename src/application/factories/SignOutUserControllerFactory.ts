import { SignOutUserController } from '@infrastructure/controller/SignOutUserController';

export class SignOutUserControllerFactory {
  static make() {
    const controller = new SignOutUserController();

    return controller;
  }
}
