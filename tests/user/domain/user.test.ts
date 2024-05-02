import { User } from '../../../src/user/domain/user';
import { Role } from '../../../src/user/domain/user-role';

class TestUser extends User {
  constructor(id: number, username: string, password: string, role: Role, balance: number) {
    super(id, username, password, role, balance);
  }
}

describe('User', () => {
  it('should create a user instance with provided values', () => {
    const id = 1;
    const username = 'john_doe';
    const password = 'password123';
    const role = Role.admin;
    const balance = 100;

    const user = new TestUser(id, username, password, role, balance);

    expect(user.id).toEqual(id);
    expect(user.username).toEqual(username);
    expect(user.password).toEqual(password);
    expect(user.role).toEqual(role);
    expect(user.balance).toEqual(balance);
  });
});
