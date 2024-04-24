import { CreateUserController } from '../../../../src/infrastructure/controller/user/CreateUserController';
import { SequelizeSignInUserRepository } from '../../../../src/domain/repositories/user/SequelizeSignInUserRepository';
import { SequelizeCreateUserRepository } from '../../../../src/domain/repositories/user/SequelizeCreateUserRepository';
import { CreateUserService } from '../../../../src/domain/services/user/CreateUserService';
import { SignInUserService } from '../../../../src/domain/services/user/SignInUserService';
import { CreateUserControllerFactory } from '../../../../src/application/factories/user/CreateUserControllerFactory';

// Mock the dependencies
jest.mock('@domain/repositories/user/SequelizeCreateUserRepository');
jest.mock('@domain/repositories/user/SequelizeSignInUserRepository');
jest.mock('@domain/services/user/CreateUserService');
jest.mock('@domain/services/user/SignInUserService');

describe('CreateUserControllerFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an instance of CreateUserController with correct dependencies', () => {
    const controller = CreateUserControllerFactory.make();

    expect(SequelizeCreateUserRepository).toHaveBeenCalledTimes(1);
    expect(SequelizeSignInUserRepository).toHaveBeenCalledTimes(1);
    expect(CreateUserService).toHaveBeenCalledTimes(1);
    expect(SignInUserService).toHaveBeenCalledTimes(1);
    expect(controller).toBeInstanceOf(CreateUserController);
  });
});
