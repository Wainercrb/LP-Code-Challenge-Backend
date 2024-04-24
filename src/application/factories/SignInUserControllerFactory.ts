import { SequelizeSignInUserRepository } from "@domain/repositories/SequelizeSignInUserRepository";
import { SignInUserService } from "@domain/services/SignInUserService";
import { SignInUserController } from "@infrastructure/controller/SignInUserController";

export class SignInUserControllerFactory {
  static make() {
    const repository = new SequelizeSignInUserRepository();
    const service = new SignInUserService(repository);
    const controller = new SignInUserController(service);

    return controller;
  }
}