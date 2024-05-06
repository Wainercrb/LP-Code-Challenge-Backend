import '@/shared/infra/load-env-vars';

import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';

import { config } from '@/shared/infra/config';
import { userRouter } from '@/user/infra/res-api/routes';
import { operationRouter } from '@/operation/infra/res-api/routes';
import { recordRouter } from '@/record/infra/res-api/routes';
import { errorHandler } from '@/shared/infra/errors/handler';

export function bootstrap(): Express {
  const app = express();

  const corsOPt: CorsOptions = {
    origin: [
      'https://main--lp-code-challenge.netlify.app',
      'https://lp-code-challenge-frontend.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  };

  app.use(cors(corsOPt));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/user', userRouter);
  app.use('/operation', operationRouter);
  app.use('/record', recordRouter);
  app.get('/', (_req, res) => res.send('OK'));
  app.use(errorHandler);

  if (!config.server.isTestMode) {
    const { port } = config.server;

    app.listen(port, () => {
      console.log(`[APP] - Starting application on port ${port}`);
    });
  }

  return app;
}

bootstrap();
