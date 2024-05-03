import { SequelizeUser } from '../../../src/shared/infra/database/models/User';
import { SequelizeUserRepository } from '../../../src/user/infra/repository/sequelize-user-repository';
import { VerifyUser } from '../../../src/user/application/verify-user';
import { Error401 } from '../../../src/shared/infra/errors/handler';
import { JwtService } from '../../../src/shared/infra/authentication/jwt-service';
import { AuthService } from '../../../src/shared/infra/authentication/auth-service';
import { MiddlewareUser } from '../../../src/shared/domain/middleware-request';

describe('[verify-user]', () => {
  it('Should verify a valid user token', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const jwtService = new JwtService();

    const verifyUser = new VerifyUser(userRepository, authService);

    const tokenPayload: MiddlewareUser = {
      userID: randomUser.id,
      role: randomUser.role,
      username: randomUser.username,
    };

    const token = await jwtService.createJWT(tokenPayload);

    const verifiedUser = await verifyUser.execute(token ?? '');

    expect(verifiedUser).toStrictEqual({
      id: randomUser?.id,
      username: randomUser?.username,
      role: randomUser?.role,
      balance: randomUser?.balance,
      password: '',
    });
  });

  it('Should verify an invalid token payload', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const jwtService = new JwtService();

    const verifyUser = new VerifyUser(userRepository, authService);

    const tokenPayload = {
      role: randomUser.role,
      username: randomUser.username,
    } as MiddlewareUser;

    const token = await jwtService.createJWT(tokenPayload);

    await expect(async () => {
      return verifyUser.execute(token ?? '');
    }).rejects.toThrow(new Error401('Token is invalid.'));
  });

  it('Should verify a valid token payload but user does not exist into the database', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const jwtService = new JwtService();

    const verifyUser = new VerifyUser(userRepository, authService);

    const tokenPayload: MiddlewareUser = {
      userID: 999,
      role: randomUser.role,
      username: randomUser.username,
    };

    const token = await jwtService.createJWT(tokenPayload);

    await expect(async () => {
      return verifyUser.execute(token ?? '');
    }).rejects.toThrow(new Error401('User does not exist.'));
  });
});
