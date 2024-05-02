// import { emailSender, logger } from "../../shared/infrastructure/dependencies";
import { SignInUseCase } from '@/users/application/signin';
import { SequelizeUserRepository } from '@/users/infra/repository/sequelize-user-repository';
import { AuthService } from '@/shared/infra/authentication/AuthService';
import { GetUserUseCase } from '@/users/application/get';
import { VerifyUseCase } from '../application/verify';
import { SignUpUseCase } from '@/users/application/signup';
import { Controller } from './res-api/controller';

const userRepository = new SequelizeUserRepository();
const authService = new AuthService();

const signInUseCase = new SignInUseCase(userRepository, authService);
const signUpUseCase = new SignUpUseCase(userRepository, authService);
const getUserUseCase = new GetUserUseCase(userRepository);
const verifyUseCase = new VerifyUseCase(userRepository, authService);

export const controller = new Controller(signUpUseCase, signInUseCase, getUserUseCase, verifyUseCase);
