import { Optional } from '../../../domain/shared/entity';
import { CreateUserDTO, UpdateUserDTO, User } from '../../../domain/users/index.model';

export default class UserRepositoryMapper {
  public static parseUserFromDb(user: Optional<any>): Optional<User> {
    if (!user) return undefined;
    const { last_name, first_name, ...rest } = user;
    return { ...rest, firstName: first_name, lastName: last_name };
  }

  public static parseUserToDb(payload: CreateUserDTO | UpdateUserDTO) {
    const { firstName, lastName, ...rest } = payload;
    let res: any = { ...rest };
    if (payload.firstName) res = { ...res, first_name: payload.firstName as string };
    if (payload.lastName) res = { ...res, last_name: payload.lastName as string };
    return res;
  }
}
