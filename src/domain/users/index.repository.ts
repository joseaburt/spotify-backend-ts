import { EntityId, Optional } from '../shared/entity';
import { CreateUserDTO, UpdateUserDTO, User } from './index.model';

export default interface UserRepository {
  findById(id: EntityId): Promise<Optional<User>>;
  findByEmail(email: string): Promise<Optional<User>>;
  create(payload: CreateUserDTO): Promise<EntityId>;
  update(id: EntityId, payload: UpdateUserDTO): Promise<boolean>;
  deleteById(id: EntityId): Promise<boolean>;
}
