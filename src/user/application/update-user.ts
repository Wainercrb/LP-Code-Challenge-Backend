import { User } from '@/user/domain/user';

// Repositories
import { UserRepository } from '@/user/domain/user-repository';

// Shared
import { Error404 } from '@/shared/infra/errors/handler';
import { logger } from '@/shared/infra/logger/logger';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number): Promise<User> {
    logger.info(`[UpdateUser] - Starting getting user data. UserID: ${userId}`);

    const foundUser = await this.userRepository.getOneById(userId);

    if (!foundUser) throw new Error404('User does not exist.');

    logger.info(`[UpdateUser] - Starting getting user data. UserID: ${userId}`);

    await this.userRepository.updateUser(foundUser.id, foundUser.username, foundUser.role, foundUser.balance);

    logger.info(`[UpdateUser] - Successfully update user data. ${foundUser}`);

    const updatedUser = await this.userRepository.getOneById(userId);

    if (!updatedUser) throw new Error404('Error getting the updated user.');

    logger.info(`[UpdateUser] - Successfully retrieve updated user. ${updatedUser}`);

    return updatedUser;
  }
}
