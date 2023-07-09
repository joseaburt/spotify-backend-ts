import supertest from 'supertest';
import { CreateUserDTO } from '../../domain/users/index.model';
import ExpressServer from '../../infrastructure/server/express-server';

const defaultCreatePayload = {
  image: '',
  firstName: 'Pepito',
  lastName: 'Fuentes',
  email: 'pepito@gmail.com',
  password: '#@ValidPassword123',
};

export const makeCreateUserPayload = (payload?: Partial<CreateUserDTO>) => ({ ...defaultCreatePayload, ...payload });

export const server = new ExpressServer();
export const app = server.getApp();

export async function validateName(key: keyof CreateUserDTO, name: string, responseBody: any) {
  // Given
  const withoutFirstNamePayload = makeCreateUserPayload({ [key]: undefined });

  // When
  let response = await supertest(app).post('/users').send(withoutFirstNamePayload);

  // Then
  expect(response.status).toBe(400);
  expect(response.body).toEqual(expect.objectContaining({ message: `${name} is required` }));

  // Given
  const shortFirstNamePayload = makeCreateUserPayload({ [key]: 'S' });

  // When
  response = await supertest(app).post('/users').send(shortFirstNamePayload);

  // Then
  expect(response.status).toBe(400);
  expect(response.body).toEqual(expect.objectContaining({ message: `${name} is too short` }));

  // Given

  const validFirstNamePayload = makeCreateUserPayload({ [key]: 'Su' });

  // When
  response = await supertest(app).post('/users').send(validFirstNamePayload);

  // Then
  expect(response.status).toBe(201);
  expect(response.body).toEqual(responseBody);
}
