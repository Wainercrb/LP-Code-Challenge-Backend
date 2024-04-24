import { SequelizeUser, UserRow } from '@infrastructure/database/models/User';
import { FindUserRepository } from '@domain/services/user/FindUserService';

export class SequelizeFindUserRepository implements FindUserRepository {
  async find(userId: number): Promise<UserRow | null> {
    const user = await SequelizeUser.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      balance: user.balance,
      role: user.role,
      password: '',
    };
  }
}
