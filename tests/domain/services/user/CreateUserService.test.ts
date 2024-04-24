import { CreateUserService } from '../../../../src/domain/services/user/CreateUserService';
import { CreateUserRepository } from '../../../../src/domain/services/user/CreateUserService';
import { AdminUser } from '../../../../src/domain/entities/User/AdminUser';
import { GuessUser } from '../../../../src/domain/entities/User/GuessUser';
import { Role } from '../../../../src/domain/entities/User/User';
import { ValidationError } from '../../../../src/domain/errors/ValidationError';

describe('CreateUserService', () => {
  describe('create', () => {
    it('should create a new user with valid parameters', async () => {
      const mockRepository: CreateUserRepository = {
        create: jest.fn().mockResolvedValue({ id: 1 }),
      };
      const service = new CreateUserService(mockRepository);
      const username = 'admin';
      const password = 'password123';
      const role = Role.admin;

      const result = await service.create(username, password, role);

      expect(result).toEqual({ id: 1 });
      expect(mockRepository.create).toHaveBeenCalledWith(expect.any(AdminUser));
    });

    it('should throw ValidationError with invalid role', async () => {
      const mockRepository: CreateUserRepository = {
        create: jest.fn(),
      };
      const service = new CreateUserService(mockRepository);
      const username = 'admin';
      const password = 'password123';
      const role = 'invalid_role';

      await expect(service.create(username, password, role)).rejects.toThrowError(ValidationError);
    });
  });

  describe('getUserInstance', () => {
    it("should return an instance of AdminUser for role 'admin'", () => {
      const mockRepository: CreateUserRepository = {
        create: jest.fn(),
      };
      const service = new CreateUserService(mockRepository);
      const username = 'admin';
      const password = 'password123';
      const role = Role.admin;

      const user = service['getUserInstance'](username, password, role, 0);

      expect(user).toBeInstanceOf(AdminUser);
      expect(user.getUsername()).toBe(username);
      expect(user.getPassword()).toBe(password);
    });

    it("should return an instance of AuthorUser for role 'author'", () => {
      const mockRepository: CreateUserRepository = {
        create: jest.fn(),
      };
      const service = new CreateUserService(mockRepository);
      const username = 'admin';
      const password = 'password123';
      const role = Role.guess;

      const user = service['getUserInstance'](username, password, role, 0);

      expect(user).toBeInstanceOf(GuessUser);
      expect(user.getUsername()).toBe(username);
      expect(user.getPassword()).toBe(password);
    });

    it('should throw ValidationError with invalid role', () => {
      const mockRepository: CreateUserRepository = {
        create: jest.fn(),
      };
      const service = new CreateUserService(mockRepository);
      const username = 'admin';
      const password = 'password123';
      const role = 'invalid_role';

      expect(() => service['getUserInstance'](username, password, role, 0)).toThrowError(ValidationError);
    });
  });
});
