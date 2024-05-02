import express from 'express';
import { controller } from '@/operation/infra/dependencies';
import { AuthService } from '@/shared/infra/authentication/AuthService';

const operationRouter = express.Router();
const authService = new AuthService()

operationRouter.get('/all', authService.handleAuthentication, controller.list.bind(controller));

export { operationRouter };
