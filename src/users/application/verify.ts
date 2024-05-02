import { Error401, Error404 } from '@/shared/infra/errors/handler';
import { UserRepository } from '@/users/domain/user-repository';
import { logger } from '@/shared/infra/logger/logger';
import { User } from '@/users/domain/user';
import { Role } from '@/users/domain/user-role';
import { AuthService } from '@/shared/infra/authentication/AuthService';
import { config } from '@/shared/infra/config';

export class VerifyUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(token: string): Promise<User> {
    logger.info('[VerifyUseCase] - start checking user id');

    const { id } = await this.authService.verifyJWT(token, config.authentication.secret);

    if (!id) {
      throw new Error401('Token is invalid');
    }

    const foundUser = await this.userRepository.getOneById(id);

    if (!foundUser) {
      throw new Error404('User does not exist.');
    }

    logger.info('[VerifyUseCase] - end checking user id');

    return {
      username: foundUser.username,
      role: foundUser.role as Role,
      balance: foundUser.balance,
      id: foundUser.id,
      password: '',
    };
  }
}
