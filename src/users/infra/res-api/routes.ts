import express from 'express';
import { controller } from '@/users/infra/dependencies';
import { auth } from '@/shared/infra/authentication/AuthMiddleware';
import { AuthService } from '@/shared/infra/authentication/AuthService';

const userRouter = express.Router();

userRouter.post('/sign-in', controller.signIn.bind(controller));
userRouter.post('/', controller.signUp.bind(controller));
userRouter.post('/sign-out', controller.signOut.bind(controller));
userRouter.get('/', auth, controller.getById.bind(controller));
userRouter.get('/verify', auth, controller.verify.bind(controller));



export { userRouter };
