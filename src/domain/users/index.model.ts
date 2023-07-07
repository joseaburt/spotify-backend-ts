import { Entity } from '../shared/entity';
import { BasicCredentials } from '../shared/security';

export type User = Entity & BasicCredentials & {};

export type CreateUserDTO = {};

export type UpdateUserDTO = {};
