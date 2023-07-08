import HttpError from '@joseaburt/http-error';
import UserRepository from './index.repository';
import { CreateUserDTO, User } from './index.model';
import { EntityId, Optional } from '../shared/entity';

export default class UserService {
  constructor(private repository: UserRepository) {}

  public async findById(id: EntityId): Promise<Optional<User>> {
    const user = await this.repository.findById(id);
    if (!user) throw new HttpError(404, 'USER_NOT_FOUND', `User with id ${id} not found`);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new HttpError(404, 'USER_NOT_FOUND', `User with email ${email} not found`, email);
    return user;
  }

  public async create(payload: CreateUserDTO): Promise<EntityId> {
    try {
      const userExistWithEmail = await this.findByEmail(payload.email);
      if (userExistWithEmail) throw new HttpError(400, 'USER_WITH_EMAIL_ALREADY_EXISTS', `Email ${payload.email} is duplicated`, payload);
      return await this.repository.create(payload);
    } catch (error) {
      throw HttpError.create(HttpError.parse(error));
    }
  }
}
