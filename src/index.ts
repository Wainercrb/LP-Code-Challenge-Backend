import '@/shared/infra/load-env-vars';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';

import { config } from '@/shared/infra/config';
import { userRouter } from '@/user/infra/res-api/routes';
import { operationRouter } from '@/operation/infra/res-api/routes';
import { recordRouter } from '@/record/infra/res-api/routes';
import { errorHandler } from '@/shared/infra/errors/handler';

const ALLOW_ORIGIN: string[] = [
  'https://main--lp-code-challenge.netlify.app',
  'https://lp-code-challenge-frontend.vercel.app',
  'http://localhost:5173',
];

const CORS_SETUP = {
  origin: ALLOW_ORIGIN,
  credentials: true,
};

function bootstrap() {
  const app = express();

  app.use(cors(CORS_SETUP));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/user', userRouter);
  app.use('/operation', operationRouter);
  app.use('/record', recordRouter);
  app.use(errorHandler);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

bootstrap();
