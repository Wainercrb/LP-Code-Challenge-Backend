import { Error404 } from '@/shared/infra/errors/handler';
import { UserRepository } from '@/user/domain/user-repository';
import { logger } from '@/shared/infra/logger/logger';
import { User } from '@/user/domain/user';
import { Role } from '@/user/domain/user-role';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number): Promise<User> {
    logger.info(`[GetUserUseCase] - starting getting user data id:${userId}`);

    const foundUser = await this.userRepository.getOneById(userId);

    if (!foundUser) {
      throw new Error404('User does not exist.');
    }

    logger.info(`[GetUserUseCase] - ending getting user data id:${userId}`);

    return {
      username: foundUser.username,
      role: foundUser.role as Role,
      balance: foundUser.balance,
      id: foundUser.id,
      password: ''
    };
  }
}
