import { AuthService } from '@/shared/infra/authentication/AuthService';
import { Error400, Error500 } from '@/shared/infra/errors/handler';
import { UserRepository } from '@/user/domain/user-repository';
import { logger } from '@/shared/infra/logger/logger';
import { User } from '@/user/domain/user';
import { Role } from '@/user/domain/user-role';

export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(
    username: string,
    password: string,
    role: Role
  ): Promise<{ user: User; token: string }> {
    logger.info(`[SignUpUseCase] - Sign-up start username:${username}`);

    const foundUser = await this.userRepository.getOneByUsername(username);

    if (foundUser) {
      throw new Error400('Username already exist.');
    }

    const hashedPassword = await this.authService.generatePasswordHash(password);

    const createdUser = await this.userRepository.createUser(username, hashedPassword, role, 10000);

    const tokenPayload = {
      id: createdUser.id,
      role: createdUser.role,
      username: createdUser.username,
    };

    const token = await this.authService.createJWT(tokenPayload);

    if (!token) {
      throw new Error500();
    }

    logger.info(`[SignUpUseCase] - Sign-up start username:${username}, id:${createdUser.id}`);

    return {
      token,
      user: {
        id: createdUser.id,
        username: createdUser.username,
        password: '',
        balance: createdUser.balance,
        role: createdUser.role,
      },
    };
  }
}
