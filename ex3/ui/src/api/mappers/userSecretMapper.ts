import { UserSecret } from 'src/models/userSecret';

import { UserSecretDto } from '../dtos/userSecretDto';

import { IMapper } from './mappers';

/** User secret mapper. */
class UserSecretMapper implements IMapper<UserSecretDto, UserSecret> {

  /** @inheritdoc */
  public toDto(data: UserSecret): UserSecretDto {
    return {
      authenticate: {
        jwtToken: data.token,
      }
    };
  }

  /** @inheritdoc */
  public fromDto(dto: UserSecretDto): UserSecret {
    return {
      token: dto.authenticate.jwtToken,
    };
  }
}

export const userSecretMapper = new UserSecretMapper();
