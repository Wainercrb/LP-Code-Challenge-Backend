import express from 'express';
import { controller } from '@/record/infra/dependencies';
import { AuthService } from '@/shared/infra/authentication/AuthService';

const recordRouter = express.Router();
const authService = new AuthService();

recordRouter.post('/', authService.handleAuthentication, controller.create.bind(controller));
recordRouter.delete('/', authService.handleAuthentication, controller.delete.bind(controller));
recordRouter.get('/all', authService.handleAuthentication, controller.list.bind(controller));

export { recordRouter };
