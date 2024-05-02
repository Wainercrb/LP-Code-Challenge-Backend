import express from 'express';
import { controller } from '@/record/infra/dependencies';
import { auth } from '@/shared/infra/authentication/AuthMiddleware';

const recordRouter = express.Router();

recordRouter.post('/', auth, controller.create.bind(controller));
recordRouter.delete('/', auth, controller.delete.bind(controller));
recordRouter.get('/all', auth, controller.list.bind(controller));

export { recordRouter };
