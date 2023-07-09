import { JwtService } from './contracts';
import AuthService from './auth.service';
import { createDbUser } from '../../shared/test-utils';
import Encrypt from '../../infrastructure/security/encrypt';
import mockUserRepository, { clearMocks } from '../../infrastructure/repositories/users/__mocks__/users.repository';

const jwtServiceMock = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('AuthService', () => {
  const service = new AuthService(mockUserRepository, jwtServiceMock as unknown as JwtService, Encrypt);
  const rawPassword = '@Pepito123';

  beforeEach(() => {
    clearMocks();
  });

  describe('login(credentials: EmailPasswordCredentials)', () => {
    it('should throw error if given credential email does no exist for any user in db', async () => {
      // Given
      const credentials = { password: '', email: 'email@gmail.com' };
      mockUserRepository.findByEmail.mockImplementation(() => undefined);

      // When / Then
      expect(() => service.login(credentials)).rejects.toThrow('Invalid credentials');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(credentials.email);
    });

    it('should throw error if given credential password does not match with user in db', async () => {
      // Given
      const savedUser = createDbUser(rawPassword);
      mockUserRepository.findByEmail.mockImplementation(() => savedUser);

      const incorrectPassword = '12345';
      const credentials = { ...savedUser, password: incorrectPassword };

      // When / Then
      expect(() => service.login(credentials)).rejects.toThrow('Invalid credentials');
    });

    it('should return user record plus signed access token', async () => {
      // Given
      const savedUser = createDbUser(rawPassword);
      mockUserRepository.findByEmail.mockImplementation(() => savedUser);
      const generatedToken = 'thetokenher';
      jwtServiceMock.sign.mockImplementation(() => generatedToken);

      // When
      const credentials = { ...savedUser, password: rawPassword };
      const user = await service.login(credentials);

      // Then
      expect(user).toEqual(expect.objectContaining({ token: generatedToken, email: savedUser.email }));
      expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
      expect(jwtServiceMock.sign).toHaveBeenCalledWith({ id: savedUser.id, email: savedUser.email });
    });
  });
});
