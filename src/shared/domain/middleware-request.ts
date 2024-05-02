import { Request } from 'express';

export interface MiddlewareUser {
  username: string;
  role: string;
  id: number;
}

export interface MiddlewareRequest extends Request {
  user?: MiddlewareUser;
}
