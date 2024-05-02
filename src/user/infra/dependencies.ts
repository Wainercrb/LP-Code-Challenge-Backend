// import { emailSender, logger } from "../../shared/infrastructure/dependencies";
import { SignInUseCase } from '@/user/application/signin';
import { SequelizeUserRepository } from '@/user/infra/repository/sequelize-user-repository';
import { AuthService } from '@/shared/infra/authentication/AuthService';
import { GetUserUseCase } from '@/user/application/get';
import { VerifyUseCase } from '../application/verify';
import { SignUpUseCase } from '@/user/application/signup';
import { Controller } from './res-api/controller';

const userRepository = new SequelizeUserRepository();
const authService = new AuthService();

const signInUseCase = new SignInUseCase(userRepository, authService);
const signUpUseCase = new SignUpUseCase(userRepository, authService);
const getUserUseCase = new GetUserUseCase(userRepository);
const verifyUseCase = new VerifyUseCase(userRepository, authService);

export const controller = new Controller(signUpUseCase, signInUseCase, getUserUseCase, verifyUseCase);
