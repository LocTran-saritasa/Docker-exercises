import { FetchResult, gql } from '@apollo/client';
import { UserDto } from 'src/api/dtos/userDto';

import { client } from '../graphql-client';

export namespace UserQuery {
  export async function getCurrentUser(): Promise<FetchResult<UserDto>> {
    return client.query<UserDto>({
      query: gql`
        query GetCurrentUser {
          userProfile {
            id
            firstname
            lastname
            email
          }
        }`,
    });
  }
}
