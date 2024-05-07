import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '@/shared/infra/logger/logger';
import { config } from '@/shared/infra/config';

export class Error401 extends Error {
  constructor(message = 'Invalid credentials.') {
    super();
    this.message = message;
  }
}

export class Error500 extends Error {
  constructor(message = 'Internal Server Error.') {
    super();
    this.message = message;
  }
}

export class Error400 extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class Error404 extends Error {
  constructor(message = 'Resource not found.') {
    super();
    this.message = message;
  }
}

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(config.server.httpStatusCode.BadRequest).json({ error: err.message });
  }

  if (err instanceof Error401) {
    return res.status(config.server.httpStatusCode.Unauthorized).json({ error: err.message });
  }

  if (err instanceof Error400) {
    return res.status(config.server.httpStatusCode.BadRequest).json({ error: err.message });
  }

  if (err instanceof Error404) {
    return res.status(config.server.httpStatusCode.NotFound).json({ error: err.message });
  }

  logger.error(err);
  return res.status(config.server.httpStatusCode.InternalServerError).json({ error: 'Internal Server Error' });
};
