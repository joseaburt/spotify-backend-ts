import supertest from 'supertest';
import initRouter from '../routes/users';
import mockUserRepository, { clearMocks } from '../__mocks__/users.repository';
import { makeCreateUserPayload, server, app, validateName } from './user-test-utils';

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

  describe('POST /users', () => {
    const createdUserId = 1;
    const createdUserResponse = { message: 'User created', id: createdUserId };

    it('should validate email', async () => {
      // Given
      const invalidPayload = makeCreateUserPayload({ email: 'maria@gs' });

      // When
      let response = await supertest(server.getApp()).post('/users').send(invalidPayload);

      // Then
      expect(response.body).toEqual(expect.objectContaining({ code: 'invalid_string', message: 'Invalid email' }));
      expect(response.status).toBe(400);

      // Given
      const validPayload = makeCreateUserPayload();
      mockUserRepository.create.mockImplementation(() => createdUserId);

      // When
      response = await supertest(server.getApp()).post('/users').send(validPayload);

      // Then
      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdUserResponse);
      expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({ email: validPayload.email }));
    });

    it('should validate valid password format', async () => {
      // Given
      const withNumberOnlyPassword = makeCreateUserPayload({ password: '12345' });

      // When
      let response = await supertest(app).post('/users').send(withNumberOnlyPassword);

      // Then
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Invalid password' }));

      // Given
      const withEmptyPassword = makeCreateUserPayload({ password: '' });

      // When
      response = await supertest(app).post('/users').send(withEmptyPassword);

      // Then
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Invalid password' }));

      // Given
      const withValidPassword = makeCreateUserPayload();

      // When
      response = await supertest(app).post('/users').send(withValidPassword);

      // Then
      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdUserResponse);
    });

    it('should validate valid user firstName', async () => {
      await validateName('firstName', 'FirstName', createdUserResponse);
    });

    it('should validate valid user lastName', async () => {
      await validateName('lastName', 'LastName', createdUserResponse);
    });
  });
});
