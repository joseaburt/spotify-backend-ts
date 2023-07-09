// yarn test auth.routes.test.ts
import supertest from 'supertest';
import initRouter from '../routes/auth';
import { createDbUser } from '../../shared/test-utils';
import AuthService from '../../domain/auth/auth.service';
import ExpressServer from '../../infrastructure/server/express-server';
import mockUserRepository, { clearMocks } from '../../infrastructure/repositories/users/__mocks__/users.repository';

const generatedToken = 'MY_GENERATED_JWT_TOKEN';

jest.mock('../../infrastructure/security/jwt', () => ({
  sign: () => generatedToken,
}));

export const server = new ExpressServer();
export const app = server.getApp();

server.registerRouter('/auth', initRouter(new AuthService(mockUserRepository)));

describe('Auth Endpoint', () => {
  beforeEach(() => {
    clearMocks();
  });

  describe('POST /auth/login', () => {
    const rawPassword = '12345678';

    it('should return 404 Not Found when given email in credentials is in any user in db', async () => {
      // Given
      const userDb = createDbUser(rawPassword);
      mockUserRepository.findByEmail.mockImplementation((email) => (userDb.email === email ? userDb : undefined));
      const credentials = { email: 'none@gmail.com', password: rawPassword };

      // When
      let response = await supertest(server.getApp()).post('/auth/login').send(credentials);

      // Then
      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Invalid credentials' }));
    });

    it('should return 401 Unauthorized when given password does not match with db user password', async () => {
      // Given
      const userDb = createDbUser(rawPassword);
      mockUserRepository.findByEmail.mockImplementation(() => userDb);
      const credentials = { email: userDb.email, password: 'my_invalid_password' };

      // When
      let response = await supertest(server.getApp()).post('/auth/login').send(credentials);

      // Then
      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Invalid credentials' }));
    });

    it('should return 200 OK and user with login as body', async () => {
      // Given
      const userDb = createDbUser(rawPassword);
      mockUserRepository.findByEmail.mockImplementation(() => userDb);
      const credentials = { email: userDb.email, password: rawPassword };

      // When
      let response = await supertest(server.getApp()).post('/auth/login').send(credentials);

      // Then
      expect(response.body).toEqual(expect.objectContaining({ ...userDb, token: generatedToken }));
      expect(response.status).toBe(200);
    });
  });
});
