import { EntityId, Optional, WithUserId } from '../shared/entity';
import { CreateUserDTO, UpdateUserDTO, User } from './index.model';

export default interface UserRepository {
  findById(id: EntityId): Promise<Optional<User>>;
  findByEmail(email: string): Promise<Optional<User>>;
  create(payload: WithUserId<CreateUserDTO>): Promise<EntityId>;
  update(id: EntityId, payload: WithUserId<UpdateUserDTO>): Promise<boolean>;
  deleteById(id: EntityId): Promise<boolean>;
}
