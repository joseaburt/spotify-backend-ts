import { Entity } from '../shared/entity';
import { BasicCredentials, WithoutPassword } from '../shared/security';

export type User = Entity &
  BasicCredentials & {
    image: string;
    lastName: string;
    firstName: string;
  };

export type CreateUserDTO = Omit<User, keyof Entity>;

export type UpdateUserDTO = Partial<CreateUserDTO>;
