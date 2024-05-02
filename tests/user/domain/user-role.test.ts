import { Role } from '../../../src/user/domain/user-role';

describe('Role', () => {
  it('should define role enums correctly', () => {
    expect(Role.guess).toEqual('guess');
    expect(Role.admin).toEqual('admin');
  });
});
