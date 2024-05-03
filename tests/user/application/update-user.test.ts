import { SequelizeUser } from '../../../src/shared/infra/database/models/User';
import { SequelizeUserRepository } from '../../../src/user/infra/repository/sequelize-user-repository';
import { UpdateUser } from '../../../src/user/application/update-user';
import { Role } from '../../../src/user/domain/user-role';
import { User } from '../../../src/user/domain/user';
import { Error404 } from '../../../src/shared/infra/errors/handler';

describe('[update-user]', () => {
  it('Should update the user', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const newUser: User = {
      id: randomUser.id,
      balance: 10,
      role: Role.guess,
      username: 'update-user-test',
      password: '',
    };

    const updateUser = new UpdateUser(userRepository);

    const response = await updateUser.execute(newUser.id, newUser.username, newUser.role, newUser.balance);

    expect(response).toStrictEqual(newUser);
  });

  it('Should throw and error if user does not exist', async () => {
    const userRepository = new SequelizeUserRepository();

    const newUser: User = {
      id: 999,
      balance: 10,
      role: Role.guess,
      username: 'update-user-test',
      password: '',
    };

    const updateUser = new UpdateUser(userRepository);

    await expect(async () => {
      return updateUser.execute(newUser.id, newUser.username, newUser.role, newUser.balance);
    }).rejects.toThrow(new Error404('User does not exist.'));
  });

  it('Should throw an error if the user update operation was successful but encounters an error while retrieving the new values.', async () => {
    const newUser: User = {
      id: 999,
      balance: 10,
      role: Role.guess,
      username: 'update-user-test',
      password: '',
    };

    const userRepository = new SequelizeUserRepository();

    jest.spyOn(userRepository, 'getOneById').mockResolvedValueOnce(newUser);

    const updateUser = new UpdateUser(userRepository);

    await expect(async () => {
      return updateUser.execute(newUser.id, newUser.username, newUser.role, newUser.balance);
    }).rejects.toThrow(new Error404('Error getting the updated user.'));
  });
});
