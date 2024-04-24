import { CreateUserController } from '@infrastructure/controller/user/CreateUserController';
import { SequelizeSignInUserRepository } from '@domain/repositories/user/SequelizeSignInUserRepository';
import { SequelizeCreateUserRepository } from '@domain/repositories/user/SequelizeCreateUserRepository';
import { CreateUserService } from '@domain/services/user/CreateUserService';
import { SignInUserService } from '@domain/services/user/SignInUserService';

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
