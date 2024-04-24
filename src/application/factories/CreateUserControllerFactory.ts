import { SequelizeSignInUserRepository } from "@domain/repositories/SequelizeSignInUserRepository";
import { SequelizeCreateUserRepository } from "@domain/repositories/SequelizeCreateUserRepository";
import { CreateUserService } from "@domain/services/CreateUserService";
import { SignInUserService } from "@domain/services/SignInUserService";
import { CreateUserController } from "@infrastructure/controller/CreateUserController";

export class CreateUserControllerFactory {
  static make() {
    const createUserRepository = new SequelizeCreateUserRepository();
    const signInUserRepository = new SequelizeSignInUserRepository();
    const createUserService = new CreateUserService(createUserRepository);
    const signInUserService = new SignInUserService(signInUserRepository);
    const controller = new CreateUserController(createUserService, signInUserService);

    return controller;
  }
}