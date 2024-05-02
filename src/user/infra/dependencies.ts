import { SequelizeUserRepository } from '@/user/infra/repository/sequelize-user-repository';
import { AuthService } from '@/shared/infra/authentication/AuthService';
import { SignInUser } from '@/user/application/sign-in-user';
import { GetUser } from '@/user/application/get-user';
import { VerifyUser } from '@/user/application/verify-user';
import { SignUpUser } from '@/user/application/sign-up-user';
import { Controller } from '@/user/infra/res-api/controller';

// Services & Repositories
const userRepository = new SequelizeUserRepository();
const authService = new AuthService();

// Use Cases
const userSignIn = new SignInUser(userRepository, authService);
const userSignUp = new SignUpUser(userRepository, authService);
const getUser = new GetUser(userRepository);
const verifyUser = new VerifyUser(userRepository, authService);

export const controller = new Controller(userSignUp, userSignIn, getUser, verifyUser);
