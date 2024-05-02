import { User } from '@/user/domain/user';

// Repositories
import { UserRepository } from '@/user/domain/user-repository';

// Shared
import { AuthService } from '@/shared/infra/authentication/AuthService';
import { Error401, Error404 } from '@/shared/infra/errors/handler';
import { logger } from '@/shared/infra/logger/logger';
import { config } from '@/shared/infra/config';

export class VerifyUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(token: string): Promise<User> {
    logger.info('[VerifyUser] - Start verifying user.');

    const { id: userID } = await this.authService.verifyJWT(token, config.authentication.secret);

    if (!userID) throw new Error401('Token is invalid');

    logger.info(`[VerifyUser] - Successfully verified user. UserID: ${userID}`);

    const foundUser = await this.userRepository.getOneById(userID);

    if (!foundUser) throw new Error404('User does not exist.');

    logger.info(`[VerifyUser] - Successfully retrieved user data. UserID: ${userID}`);

    return {
      ...foundUser,
      password: '',
    };
  }
}
