import express from 'express';
import { controller } from '@/record/infra/dependencies';
import { auth } from '@/shared/infra/authentication/AuthMiddleware';

const recordRouter = express.Router();

recordRouter.get('/all', auth, controller.getAll.bind(controller));
recordRouter.post('/', auth, controller.createRecord.bind(controller));
recordRouter.delete('/', auth, controller.deleteRecord.bind(controller));

export { recordRouter };
