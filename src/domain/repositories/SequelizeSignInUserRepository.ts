import { SequelizeUser, UserRow } from '@infrastructure/database/models/User';
import { SignInUserRepository } from '@domain/services/SignInUserService';

export class SequelizeSignInUserRepository implements SignInUserRepository {
  async findByUsername(username: string): Promise<UserRow | null> {
    return SequelizeUser.findOne({
      where: {
        username,
      },
      raw: true,
    });
  }
}
