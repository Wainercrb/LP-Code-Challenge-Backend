import { SignInUserRepository, SignInUserService } from "../../../../src/domain/services/user/SignInUserService";

describe('SignInUserService', () => {
  let signInUserService: SignInUserService;
  let mockRepository: SignInUserRepository;

  beforeEach(() => {
    // Create a mock repository
    mockRepository = {
      findByUsername: jest.fn(),
    };

    // Instantiate SignInUserService with the mock repository
    signInUserService = new SignInUserService(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call repository findByUsername method with the correct email', async () => {
    const email = 'test@example.com';

    // Call the service method
    await signInUserService.findByUsername(email);

    // Assert that the repository method was called with the correct email
    expect(mockRepository.findByUsername).toHaveBeenCalledWith(email);
  });

  // Add more tests as needed to cover other scenarios
});
