import { User } from '@/user/domain/user';
import { UserRepository } from '@/user/domain/user-repository';
import { SequelizeUser } from '@/shared/infra/database/models/User';
import { Role } from '@/user/domain/user-role';
import { toSingleUser } from '@/user/infra/repository/mapper';
import { Transaction } from 'sequelize';

export class SequelizeUserRepository implements UserRepository {
  async getOneByUsername(username: string, t?: Transaction): Promise<User | null> {
    const foundUser = await SequelizeUser.findOne({
      where: {
        username,
      },
      transaction: t,
    });

    if (!foundUser) return null;

    return toSingleUser(foundUser);
  }

  async getOneById(id: number, t?: Transaction): Promise<User | null> {
    const foundUser = await SequelizeUser.findOne({
      where: {
        id,
      },
      transaction: t,
    });

    if (!foundUser) return null;

    return toSingleUser(foundUser);
  }

  async createUser(username: string, password: string, Role: Role, balance: number, t?: Transaction): Promise<User> {
    const userSaved = await SequelizeUser.create(
      {
        username,
        password,
        role: Role.toString(),
        balance,
      },
      { transaction: t },
    );

    return toSingleUser(userSaved);
  }

  async updateUser(
    id: number,
    username: string,
    Role: Role,
    balance: number,
    t?: Transaction,
  ): Promise<[affectedCount: number]> {
    const body = {
      username,
      role: Role.toString(),
      balance,
    };

    return SequelizeUser.update(body, {
      where: { id },
      transaction: t,
    });
  }

  async updateBalanceById(id: number, balance: number, t?: Transaction): Promise<[affectedCount: number]> {
    return SequelizeUser.update(
      {
        balance,
      },
      {
        where: { id },
        transaction: t,
      },
    );
  }
}
