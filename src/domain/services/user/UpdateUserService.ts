import { AdminUser } from '@domain/entities/User/AdminUser';
import { GuessUser } from '@domain/entities/User/GuessUser';
import { Role, User } from '@domain/entities/User/User';
import { ValidationError } from '@domain/errors/ValidationError';
import { UserRow } from '@infrastructure/database/models/User';

export interface UpdateUserRepository {
  update(user: User, userId: number): Promise<UserRow>;
}

export class UpdateUserService {
  constructor(private repository: UpdateUserRepository) {}

  async update(username: string, role: string, balance: number, userId: number) {
    const user = this.getUserInstance(username, '', role, balance);

    return this.repository.update(user, userId);
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
