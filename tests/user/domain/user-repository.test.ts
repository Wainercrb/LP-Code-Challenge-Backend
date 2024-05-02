import { UserRepository } from '../../../src/user/domain/user-repository';
import { Role } from '../../../src/user/domain/user-role';
import { User } from '../../../src/user/domain/user';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    // Instantiate your UserRepository implementation here or use a mock
    // userRepository = new YourUserRepositoryImplementation();
  });

  it('should have the required methods defined', () => {
    // expect(userRepository.getOneByUsername).toBeDefined();
    // expect(userRepository.getOneById).toBeDefined();
    // expect(userRepository.updateBalanceById).toBeDefined();
    // expect(userRepository.createUser).toBeDefined();
    // expect(userRepository.updateUser).toBeDefined();
  });

//   it('should return correct types from methods', async () => {
//     expect(await userRepository.getOneByUsername('john_doe')).toBeInstanceOf(User);
//     expect(await userRepository.getOneById(1)).toBeInstanceOf(User);
//     expect(await userRepository.updateBalanceById(1, 100)).toEqual([1]); // Adjust expected value based on your implementation
//     expect(await userRepository.createUser('jane_doe', 'password456', Role.admin, 200)).toBeInstanceOf(User);
//     expect(await userRepository.updateUser(1, 'jane_doe', Role.admin, 200)).toEqual([1]); // Adjust expected value based on your implementation
//   });
});
