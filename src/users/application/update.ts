import { Error404 } from '@/shared/infra/errors/handler';
import { UserRepository } from '@/users/domain/user-repository';
import { logger } from '@/shared/infra/logger/logger';
import { User } from '@/users/domain/user';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number): Promise<User> {
    logger.info(`[GetUserUseCase] - starting getting user data id:${userId}`);

    const foundUser = await this.userRepository.getOneById(userId);

    if (!foundUser) {
      throw new Error404('User does not exist.');
    }

    logger.info(`[GetUserUseCase] - ending getting user data id:${userId}`);

    return foundUser;
  }
}
