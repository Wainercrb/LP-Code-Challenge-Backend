import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { auth, AuthUser, MiddlewareRequest } from '../../../src/infrastructure/middleware/auth.middleware';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let req: MiddlewareRequest;
  let res: Response;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      cookies: {},
    } as MiddlewareRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  it('should return 401 if no cookies found', async () => {
    req = {} as MiddlewareRequest;

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No cookies found, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is not valid', async () => {
    req.cookies = { token: 'invalid_token' };

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, null);
    });

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not valid' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should set user and call next if token is valid', async () => {
    req.cookies = { token: 'valid_token' };

    const validUser: AuthUser = { username: 'testUser', role: 'admin', id: 123 };

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, validUser);
    });

    await auth(req, res, next);

    expect(jwt.verify).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(validUser);
  });

  it('should handle internal server error', async () => {
    const errorMessage = 'Verification failed';
    req.cookies = { token: 'valid_token' };

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error(errorMessage), null);
    });
    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Verification failed' });
    expect(next).not.toHaveBeenCalled();
  });
});
