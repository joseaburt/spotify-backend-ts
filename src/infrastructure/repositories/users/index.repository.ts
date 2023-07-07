import { defaultDatasource } from '../../database';
import DataSource from '@joseaburt/mysql2-query-builder';
import UserRepository from '../../../domain/users/index.repository';
import { EntityId, Optional } from '../../../domain/shared/entity';
import { CreateUserDTO, UpdateUserDTO, User } from '../../../domain/users/index.model';
import UserRepositoryMapper from './index.mappers';

export default class SQLUserRepository implements UserRepository {
  constructor(private datasource: DataSource = defaultDatasource) {}

  public async findById(id: EntityId): Promise<Optional<User>> {
    const conn = await this.datasource.getConnection();
    const [user] = await conn.select('*').from('users').where('id = ?').execute([id]);
    return UserRepositoryMapper.parseUserFromDb(user);
  }

  public async findByEmail(email: string): Promise<Optional<User>> {
    const conn = await this.datasource.getConnection();
    const [user] = await conn.select('*').from('users').where('email = ?').execute([email]);
    return UserRepositoryMapper.parseUserFromDb(user);
  }

  public async create(payload: CreateUserDTO): Promise<EntityId> {
    const conn = await this.datasource.getConnection();
    return await conn.insert('users', UserRepositoryMapper.parseUserToDb(payload));
  }

  public async update(id: EntityId, payload: UpdateUserDTO): Promise<boolean> {
    const conn = await this.datasource.getConnection();
    return await conn.update('users', UserRepositoryMapper.parseUserToDb(payload), 'WHERE id = ?', [id]);
  }

  public async deleteById(id: EntityId): Promise<boolean> {
    const conn = await this.datasource.getConnection();
    return await conn.delete('users', 'WHERE id = ?', [id]);
  }
}
