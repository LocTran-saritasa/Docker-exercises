import { FetchResult, gql } from '@apollo/client';
import { LoginDto } from 'src/api/dtos/loginDto';
import { UserSecretDto } from 'src/api/dtos/userSecretDto';

import { client } from '../graphql-client';

export namespace AuthQuery {

  /**
   * Login.
   * @param loginData Login data.
   */
  export function login(loginData: LoginDto): Promise<FetchResult<UserSecretDto>> {
    return client.mutate<UserSecretDto>({
      mutation: gql`
        mutation{
          authenticate(input:{email:"${loginData.email}", password:"${loginData.password}"}) {
            jwtToken
          }
        }`,
    });
  }
}
