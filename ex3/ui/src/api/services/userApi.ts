import { User } from 'src/models/user';

import { userMapper } from '../mappers/userMapper';

import { UserQuery } from './queries/user';

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
