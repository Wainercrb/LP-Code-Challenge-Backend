import { User } from '@/user/domain/user';

//  Repositories
import { UserRepository } from '@/user/domain/user-repository';

// Shared
import { logger } from '@/shared/infra/logger/logger';
import { Error404 } from '@/shared/infra/errors/handler';

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userID: number): Promise<User> {
    logger.info(`[GetUserUseCase] - Starting getting user data. User ID: ${userID}`);

    const foundUser = await this.userRepository.getOneById(userID);

    if (!foundUser) throw new Error404('User does not exist.');

    logger.info(`[GetUserUseCase] - Successfully retrieved user data. User ID: ${userID}`);

    return {
      ...foundUser,
      password: '',
    };
  }
}
