import express from 'express';
import { auth } from '@/shared/infra/authentication/AuthMiddleware';
import { controller } from '@/user/infra/dependencies';

const userRouter = express.Router();

userRouter.get('/', auth, controller.getById.bind(controller));
userRouter.post('/', controller.signUp.bind(controller));
userRouter.post('/sign-in', controller.signIn.bind(controller));
userRouter.post('/sign-out', controller.signOut.bind(controller));
userRouter.get('/verify', auth, controller.verify.bind(controller));

export { userRouter };
