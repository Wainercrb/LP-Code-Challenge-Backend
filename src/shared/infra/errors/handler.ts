import { NextFunction, Request, Response } from 'express';
import { logger } from '@/shared/infra/logger/logger';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';

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
  if (err instanceof JsonWebTokenError) {
    return res.status(500).json({ error: err.message });
  } else if (err instanceof ZodError) {
    return res.status(400).json({ error: err.message });
  } else if (err instanceof Error401) {
    logger.error(err.message);
    res.status(401).json({ error: err.message });
  } else if (err instanceof Error500) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  } else if (err instanceof Error400) {
    logger.error(err.message);
    res.status(400).json({ error: err.message });
  } else if (err instanceof Error404) {
    logger.error(err.message);
    res.status(404).json({ error: err.message });
  } else {
    logger.error(err);
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
