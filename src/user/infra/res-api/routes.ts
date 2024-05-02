import express from 'express';
import { controller } from '@/user/infra/dependencies';
import { AuthService } from '@/shared/infra/authentication/auth-service';

const userRouter = express.Router();
const authService = new AuthService()

userRouter.get('/', authService.handleAuthentication, controller.getById.bind(controller));
userRouter.post('/', controller.signUp.bind(controller));
userRouter.post('/sign-in', controller.signIn.bind(controller));
userRouter.post('/sign-out', controller.signOut.bind(controller));
userRouter.get('/verify', authService.handleAuthentication, controller.verify.bind(controller));

export { userRouter };
