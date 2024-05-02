import { User } from '@/user/domain/user';
import { Role } from '@/user/domain/user-role';

// Repositories
import { UserRepository } from '@/user/domain/user-repository';

// Shared
import { Error400, Error500 } from '@/shared/infra/errors/handler';
import { AuthService } from '@/shared/infra/authentication/AuthService';
import { logger } from '@/shared/infra/logger/logger';

export class SignUpUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(username: string, password: string, role: Role): Promise<{ user: User; token: string }> {
    logger.info(`[SignUpUser] - Sign-up start. Username: ${username}`);

    const foundUser = await this.userRepository.getOneByUsername(username);

    if (foundUser) throw new Error400('Username already exist.');

    logger.info(`[SignUpUser] - New user. Username: ${username}`);

    const hashedPassword = await this.authService.generatePasswordHash(password);

    const createdUser = await this.userRepository.createUser(username, hashedPassword, role, 10000);

    const tokenPayload = {
      userID: createdUser.id,
      role: createdUser.role,
      username: createdUser.username,
    };

    const token = await this.authService.createJWT(tokenPayload);

    if (!token) throw new Error500();

    logger.info(`[SignUpUser] - Sign-up successful. Username: ${username}, UserID: ${createdUser.id}`);

    return {
      token,
      user: {
        ...createdUser,
        password: '',
      },
    };
  }
}
