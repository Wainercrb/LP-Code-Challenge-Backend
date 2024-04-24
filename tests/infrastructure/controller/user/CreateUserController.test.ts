import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { CreateUserController } from '../../../../src/infrastructure/controller/user/CreateUserController';
import { CreateUserRepository, CreateUserService } from '../../../../src/domain/services/user/CreateUserService';
import { SignInUserRepository, SignInUserService } from '../../../../src/domain/services/user/SignInUserService';
import { createAccessToken } from '../../../../src/infrastructure/middleware/jwt/AccessToken';
import { ValidationError } from '../../../../src/domain/errors/ValidationError';
import { Role } from '../../../../src/domain/entities/User/User';

jest.mock('@domain/services/user/CreateUserService');
jest.mock('@domain/services/user/SignInUserService');
jest.mock('@infrastructure/middleware/jwt/AccessToken');
jest.mock('bcryptjs');

describe('CreateUserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let createUserController: CreateUserController;

  beforeEach(() => {
    const mockCreateUserRepository: CreateUserRepository = {
      create: jest.fn(),
    };
    const mockSignInUserRepository: SignInUserRepository = {
      findByUsername: jest.fn(),
    };

    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    createUserController = new CreateUserController(
      new CreateUserService(mockCreateUserRepository),
      new SignInUserService(mockSignInUserRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle user creation successfully', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const role = Role.admin;
    const hashedPassword = 'hashed_password';
    const mockUser = { id: 1, username, role };
    const mockResponse = { id: mockUser.id, username: mockUser.username, role: mockUser.role };
    const mockToken = 'mock_token';

    req.body = { username, password, role };

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (CreateUserService.prototype.create as jest.Mock).mockResolvedValue(mockUser);
    (createAccessToken as jest.Mock).mockResolvedValue(mockToken);

    await createUserController.handle(req as Request, res as Response);

    expect(CreateUserService.prototype.create).toHaveBeenCalledWith(username, hashedPassword, role);
    expect(createAccessToken).toHaveBeenCalledWith(mockResponse);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.cookie).toHaveBeenCalledWith('token', mockToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should handle user creation error', async () => {
    const errorMessage = 'Error creating user';
    const mockValidationError = new ValidationError(errorMessage);

    req.body = { username: 'testuser', password: 'testpassword', role: Role.admin };

    (CreateUserService.prototype.create as jest.Mock).mockRejectedValue(mockValidationError);

    await createUserController.handle(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should handle validation error', async () => {
    const validationErrors = [
      {
        code: 'too_small',
        exact: false,
        inclusive: true,
        message: 'String must contain at least 3 character(s)',
        minimum: 3,
        path: ['username'],
        type: 'string',
      },
    ];

    req.body = { username: '', password: 'testpassword', role: Role.admin };

    await createUserController.handle(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: validationErrors });
  });
});
