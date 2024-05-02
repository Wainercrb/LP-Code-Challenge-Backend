import express from 'express';
import { controller } from '@/operation/infra/dependencies';
import { auth } from '@/shared/infra/authentication/AuthMiddleware';

const operationRouter = express.Router();

operationRouter.get('/all', auth, controller.getAll.bind(controller));

export { operationRouter };