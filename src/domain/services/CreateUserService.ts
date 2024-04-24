import { AdminUser } from '@domain/entities/User/AdminUser';
import { GuessUser } from '@domain/entities/User/GuessUser';
import { Role, User } from '@domain/entities/User/User';
import { ValidationError } from '@domain/errors/ValidationError';
import { UserRow } from '@infrastructure/database/models/User';

const DEFAULT_BALANCE: number = 10000;

export interface CreateUserRepository {
  create(user: User): Promise<UserRow>;
}

export class CreateUserService {
  constructor(private repository: CreateUserRepository) { }

  async create(username: string, password: string, role: string) {
    const user = this.getUserInstance(username, password, role, DEFAULT_BALANCE);

    return this.repository.create(user);
  }

  private getUserInstance(username: string, password: string, role: string, balance: number): User {
    if (role === Role.admin) {
      return new AdminUser(username, password, balance);
    }

    if (role === Role.guess) {
      return new GuessUser(username, password, balance);
    }

    throw new ValidationError('INVALID_ROLE');
  }
}
