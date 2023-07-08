import { defaultDatasource } from '../../database';
import SQLUserRepository from './index.repository';
import { CreateUserDTO } from '../../../domain/users/index.model';
import { ConnectionDecorator } from '@joseaburt/mysql2-query-builder';

function createUserPayload(payload?: Partial<CreateUserDTO>): CreateUserDTO {
  return { firstName: 'John', lastName: 'Corn', image: '', email: 'john@gmail.com', password: 'mnopqrstuvwxyz0123456789$', ...payload };
}

const table = 'users';
describe('SQLUserRepository', () => {
  const repo = new SQLUserRepository();

  let connection: ConnectionDecorator;

  beforeAll(async () => {
    connection = await defaultDatasource.getConnection();
    await connection.execute(`TRUNCATE TABLE ${table}`);
    await connection.execute(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
  });

  afterAll(async () => {
    await connection.execute(`TRUNCATE TABLE ${table}`);
    await connection.closeConnection();
  });

  it('should save in db the given user payload', async () => {
    const createdUserId = await repo.create(createUserPayload());
    expect(createdUserId).not.toBe(0);
  });

  it('should throw an error when try to create a user with already taken email', async () => {
    const payload = createUserPayload({ email: 'maria@gmail.com' });
    await repo.create(payload);
    expect(() => repo.create(payload)).rejects.toThrow(`Duplicate entry '${payload.email}' for key 'users.email'`);
  });

  it('should find a user by its id', async () => {
    const payload = createUserPayload({ email: 'john2@gmail.com' });
    const createdUserId = await repo.create(payload);
    const createdUser = await repo.findById(createdUserId);

    expect(createdUser).toEqual(expect.objectContaining(payload));
  });

  it('should return undefined if user not found by id', async () => {
    const user = await repo.findById(1123);
    expect(user).toBeUndefined();
  });

  it('should find a user by its email', async () => {
    const payload = createUserPayload({ email: 'findingEmail@gmail.com' });
    await repo.create(payload);
    const createdUser = await repo.findByEmail(payload.email);

    expect(createdUser).toEqual(expect.objectContaining(payload));
  });

  it('should return undefined if user not found by email', async () => {
    const user = await repo.findByEmail('pepe@yahoo.com');
    expect(user).toBeUndefined();
  });

  it('should update a given user by its id', async () => {
    const payload = createUserPayload({ email: 'updatingUser@gmail.com', firstName: 'p' });
    const createdUserId = await repo.create(payload);

    const updating = { firstName: 'Maria' };
    const updatedUserResult = await repo.update(createdUserId, updating);
    expect(updatedUserResult).toBeTruthy();

    const createdUser = await repo.findById(createdUserId);
    expect(createdUser).toEqual(expect.objectContaining(updating));
  });

  it('should delete a given user by its id', async () => {
    const payload = createUserPayload({ email: 'deletingUser@gmail.com' });
    const createdUserId = await repo.create(payload);

    const deletedUserResult = await repo.deleteById(createdUserId);
    expect(deletedUserResult).toBeTruthy();

    const createdUser = await repo.findById(createdUserId);
    expect(createdUser).toBe(undefined);
  });
});
