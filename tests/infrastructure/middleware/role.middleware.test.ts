/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { isAdmin, isGuess } from '../../../src/infrastructure/middleware/role.middleware';
import { MiddlewareRequest } from '../../../src/infrastructure/middleware/auth.middleware';
import { Role } from '../../../src/domain/entities/User/User';

describe('Role Middleware', () => {
  let req: Partial<MiddlewareRequest>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { user: undefined };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isAdmin', () => {
    it('should call next if user is admin', () => {
      req.user = { role: Role.admin, id: 1, username: 'test' };

      isAdmin(req as MiddlewareRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user is not admin', () => {
      req.user = { role: Role.guess, id: 1, username: 'test' };

      isAdmin(req as MiddlewareRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Require Admin Role User!' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if user is not authenticated', () => {
      isAdmin(req as MiddlewareRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Require Authenticated  User!' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('isGuess', () => {
    it('should call next if user is guess', () => {
      req.user = { role: Role.guess, id: 1, username: 'test' };

      isGuess(req as MiddlewareRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user is not guess', () => {
      req.user = { role: Role.admin, id: 1, username: 'test' };

      isGuess(req as MiddlewareRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Require Guess Role User!' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if user is not authenticated', () => {
      isGuess(req as MiddlewareRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Require Authenticated  User!' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
