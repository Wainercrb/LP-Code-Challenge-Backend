import { SequelizeUser, UserRow } from '@infrastructure/database/models/User';
import { User } from '@domain/entities/User/User';
import { CreateUserRepository } from '@domain/services/user/CreateUserService';

export class SequelizeCreateUserRepository implements CreateUserRepository {
  async create(user: User): Promise<UserRow> {
    const userSaved = await SequelizeUser.create({
      username: user.getUsername(),
      password: user.getPassword(),
      role: user.getRole(),
      balance: user.getBalance(),
    });

    return {
      id: userSaved.id,
      username: userSaved.username,
      balance: userSaved.balance,
      role: userSaved.role,
      password: '',
    };
  }
}
