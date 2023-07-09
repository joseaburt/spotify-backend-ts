import AuthService from './auth.service';
import Jwt_ from '../../infrastructure/security/jwt';
import Encrypt from '../../infrastructure/security/encrypt';
import mockUserRepository, { clearMocks } from '../../infrastructure/repositories/users/__mocks__/users.repository';

jest.mock('../../infrastructure/security/jwt', () => ({
  sign: jest.fn(),
}));

const signMockReference = Jwt_.sign as jest.Mock;

describe('AuthService', () => {
  const service = new AuthService(mockUserRepository);
  const rawPassword = '@Pepito123';

  function createDbUser() {
    const hashedPassword = Encrypt.encode(rawPassword);
    return { id: 1, password: hashedPassword, email: 'email@gmail.com' };
  }

  beforeEach(() => {
    clearMocks();
  });

  describe('login(credentials: EmailPasswordCredentials)', () => {
    it('should throw error if given credential email does no exist for any user in db', async () => {
      // Given
      const credentials = { password: '', email: 'email@gmail.com' };
      mockUserRepository.findByEmail.mockImplementation(() => undefined);

      // When / Then
      expect(() => service.login(credentials)).rejects.toThrow(`User not found by email "${credentials.email}"`);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(credentials.email);
    });

    it('should throw error if given credential password does not match with user in db', async () => {
      // Given
      const savedUser = createDbUser();
      mockUserRepository.findByEmail.mockImplementation(() => savedUser);

      const incorrectPassword = '12345';
      const credentials = { ...savedUser, password: incorrectPassword };

      // When / Then
      expect(() => service.login(credentials)).rejects.toThrow('Invalid credentials');
    });

    it('should return user record plus signed access token', async () => {
      // Given
      const savedUser = createDbUser();
      mockUserRepository.findByEmail.mockImplementation(() => savedUser);
      const generatedToken = 'thetokenher';
      signMockReference.mockImplementation(() => generatedToken);

      // When
      const credentials = { ...savedUser, password: rawPassword };
      const user = await service.login(credentials);

      // Then
      expect(user).toEqual(expect.objectContaining({ token: generatedToken, email: savedUser.email }));
      expect(signMockReference).toHaveBeenCalledTimes(1);
      expect(signMockReference).toHaveBeenCalledWith({ id: savedUser.id, email: savedUser.email });
    });
  });
});
