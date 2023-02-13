import { User } from 'src/models/user';

import { UserDto } from '../dtos/userDto';
import { userMapper } from '../mappers/userMapper';
import { UserQuery } from './queries/user';

// TODO (template preparation): This service was made for template. Remove it from your project.
export namespace UserApi {

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    const { data } = await UserQuery.getCurrentUser();
    if (data == null) {
      throw new Error();
    }
    return userMapper.fromDto(data);
  }
}
