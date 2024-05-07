import { validateSignUp } from '../../../../src/user/infra/validations/sign-up';
import { Role } from '../../../../src/user/domain/user-role';

describe('validateSignUp', () => {
  it('should return a User object with valid input', () => {
    const validBody = {
      username: 'jane_doe',
      password: 'password456',
      role: Role.admin,
    };

    const user = validateSignUp(validBody);

    expect(user).toEqual({
      id: 0,
      username: 'jane_doe',
      password: 'password456',
      role: Role.admin,
      balance: 0,
    });
  });

  it('should throw an error with invalid input', () => {
    const invalidUsernameBody = {
      username: 'jd',
      password: 'password123',
      role: Role.admin,
    };
    expect(() => validateSignUp(invalidUsernameBody)).toThrow();

    const invalidPasswordBody = {
      username: 'john_doe',
      password: 'pw',
      role: Role.admin,
    };
    expect(() => validateSignUp(invalidPasswordBody)).toThrow();

    const invalidRoleBody = {
      username: 'john_doe',
      password: 'password123',
      role: 'invalid_role',
    };
    expect(() => validateSignUp(invalidRoleBody)).toThrow();
  });
});
