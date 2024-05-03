import { User } from '@/user/domain/user';
import { Role } from '@/user/domain/user-role';

// Repositories
import { UserRepository } from '@/user/domain/user-repository';

// Shared
import { Error404 } from '@/shared/infra/errors/handler';
import { logger } from '@/shared/infra/logger/logger';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userID: number, username: string, role: Role, balance: number): Promise<User> {
    logger.info(`[UpdateUser] - Starting getting user data. UserID: ${userID}`);

    const foundUser = await this.userRepository.getOneById(userID);

    if (!foundUser) throw new Error404('User does not exist.');

    logger.info(`[UpdateUser] - Starting getting user data. UserID: ${userID}`);

    await this.userRepository.updateUser(userID, username, role, balance);

    logger.info(`[UpdateUser] - Successfully update user data. ${foundUser}`);

    const updatedUser = await this.userRepository.getOneById(userID);

    if (!updatedUser) throw new Error404('Error getting the updated user.');

    logger.info(`[UpdateUser] - Successfully retrieve updated user. ${updatedUser}`);

    return {
      ...updatedUser,
      password: '',
    };
  }
}
