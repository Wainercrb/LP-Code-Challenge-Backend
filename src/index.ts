// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { CreateUserControllerFactory } from '@application/factories/user/CreateUserControllerFactory';
// import { SignOutUserControllerFactory } from '@application/factories/user/SignOutUserControllerFactory';
// import { ProfileUserControllerFactory } from '@application/factories/user/ProfileUserControllerFactory';
// import { SignInUserControllerFactory } from '@application/factories/user/SignInUserControllerFactory';
// import { VerifyUserControllerFactory } from '@application/factories/user/VerifyUserControllerFactory';
// import { CreateRecordControllerFactory } from '@application/factories/record/CreateRecordControllerFactory';
// import { ListRecordControllerFactory } from '@application/factories/record/ListRecordControllerFactory';
// import { DeleteRecordControllerFactory } from '@application/factories/record/DeleteRecordControllerFactory';
// import { ListOperationControllerFactory } from '@application/factories/operation/ListOperationControllerFactory';
// import { auth } from '@infrastructure/middleware/auth.middleware';
// import { isAdmin } from '@infrastructure/middleware/role.middleware';

// const PORT = 3000;
// const ALLOW_ORIGIN: string[] = [
//   'https://main--lp-code-challenge.netlify.app',
//   'https://lp-code-challenge-frontend.vercel.app',
//   'http://localhost:5173'
// ];

// const CORS_SETUP = {
//   origin: ALLOW_ORIGIN,
//   credentials: true,
// };

// const app = express();

// app.use(cors(CORS_SETUP));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// const createUserController = CreateUserControllerFactory.make();
// const createRecordController = CreateRecordControllerFactory.make();
// const listRecordController = ListRecordControllerFactory.make();
// const listOperationController = ListOperationControllerFactory.make();
// const signInUserController = SignInUserControllerFactory.make();
// const verifyUserController = VerifyUserControllerFactory.make();
// const signOutUserController = SignOutUserControllerFactory.make();
// const profileUserController = ProfileUserControllerFactory.make();
// const deleteRecordController = DeleteRecordControllerFactory.make();

// app.post('/sign-up', (req, res) => createUserController.handle(req, res));
// app.post('/sign-in', (req, res) => signInUserController.handle(req, res));
// app.post('/sign-out', (req, res) => signOutUserController.handle(req, res));
// app.get('/verify-user', (req, res) => verifyUserController.handle(req, res));
// app.post('/record', auth, (req, res) => createRecordController.handle(req, res));
// app.delete('/record', auth, (req, res) => deleteRecordController.handle(req, res));
// app.get('/records', auth, (req, res) => listRecordController.handle(req, res));
// app.get('/operations', auth, (req, res) => listOperationController.handle(req, res));
// app.get('/users', auth, isAdmin, (req, res) => listRecordController.handle(req, res));
// app.get('/profile', auth, (req, res) => profileUserController.handle(req, res));

// app.listen(PORT, () => console.log(`online, app listing on port: ${PORT}`));


import "@/shared/infra/load-env-vars";

import cors from 'cors'
import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";

import { config } from "@/shared/infra/config";
import { userRouter } from "@/user/infra/res-api/routes";
import { operationRouter } from "@/operation/infra/res-api/routes";
import { recordRouter } from "@/record/infra/res-api/routes";




import { errorHandler} from '@/shared/infra/errors/handler'

const PORT = 3000;
const ALLOW_ORIGIN: string[] = [
  'https://main--lp-code-challenge.netlify.app',
  'https://lp-code-challenge-frontend.vercel.app',
  'http://localhost:5173'
];

const CORS_SETUP = {
  origin: ALLOW_ORIGIN,
  credentials: true,
}


function bootstrap() {
  const app = express();

  app.use(cors(CORS_SETUP))
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use("/user", userRouter);
  app.use("/operation", operationRouter);
  app.use("/record", recordRouter);
  app.use(errorHandler)
  
  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

bootstrap();
