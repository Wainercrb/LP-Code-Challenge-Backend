import { SequelizeUser } from '../../../src/shared/infra/database/models/User';
import { SequelizeUserRepository } from '../../../src/user/infra/repository/sequelize-user-repository';
import { GetUser } from '../../../src/user/application/get-user';
import { setupDatabase, teardownDatabase } from '../../../tests/shared/infra/setup-database';
import { Error404 } from '../../../src/shared/infra/errors/handler';

describe('[get-user-test]', () => {
  beforeAll(async () => {
    await setupDatabase();
  });

  afterEach(async () => {
    await teardownDatabase();
  });

  it('Should get a valid user', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const getUser = new GetUser(userRepository);

    const foundUser = await getUser.execute(randomUser.id);

    expect(foundUser).toStrictEqual({
      id: randomUser.id,
      username: randomUser.username,
      role: randomUser.role,
      balance: randomUser.balance,
      password: '',
    });
  });

  it('Should get a invalid user', async () => {
    const userRepository = new SequelizeUserRepository();

    const getUser = new GetUser(userRepository);

    expect(async () => {
      await getUser.execute(9999);
    }).rejects.toThrow(Error404);
  });
});
