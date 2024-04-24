import { SequelizeUser, UserRow } from '@infrastructure/database/models/User';
import { UpdateUserRepository } from '@domain/services/user/UpdateUserService';
import { User } from '@domain/entities/User/User';

export class SequelizeUpdateUserRepository implements UpdateUserRepository {
  async update(user: User, userId: number): Promise<UserRow> {
    const body = {
      username: user.getUsername(),
      role: user.getRole(),
      balance: user.getBalance(),
    };

    await SequelizeUser.update(body, {
      where: { id: userId },
    });

    const updatedUser = await SequelizeUser.findOne({ where: { id: userId } });

    return {
      id: userId,
      balance: updatedUser?.balance || body.balance,
      role: updatedUser?.role || body.role,
      username: updatedUser?.username || body.username,
      password: '',
    };
  }
}
