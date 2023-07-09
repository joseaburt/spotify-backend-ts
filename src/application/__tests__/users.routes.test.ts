import supertest from 'supertest';
import initRouter from '../routes/users';
import { server } from './user-test-utils';
import mockUserRepository, { clearMocks } from '../__mocks__/users.repository';

server.registerRouter('/users', initRouter(mockUserRepository));

describe('Users Endpoint', () => {
  beforeEach(() => {
    clearMocks();
  });

  describe('GET /user/:id', () => {
    test('should return 404 "User width id \'{id}\' not found"', async () => {
      // Given
      mockUserRepository.findById.mockImplementation(() => undefined);
      const userParamId = 1;

      // When
      const response = await supertest(server.getApp()).get('/users/' + userParamId);

      // Then
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userParamId);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User with id "1" not found.' });
    });

    test('should return 200 and found user', async () => {
      // Given
      const userParamId = 1;
      const foundUserInDb = { id: userParamId, email: 'p@gmail.com' };
      mockUserRepository.findById.mockImplementation(() => foundUserInDb);

      // When
      const response = await supertest(server.getApp()).get('/users/' + userParamId);

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toEqual(foundUserInDb);
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });
  });
});
