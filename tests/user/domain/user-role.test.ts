import { Role } from '../../../src/user/domain/user-role';

describe('[user-role]', () => {
  it('should define role enums correctly', () => {
    expect(Role.guess).toEqual('guess');
    expect(Role.admin).toEqual('admin');
  });
});
