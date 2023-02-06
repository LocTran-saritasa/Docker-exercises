import { FetchResult, gql } from '@apollo/client';
import { UserSecretDto } from 'src/api/dtos/userSecretDto';
import { client } from '../graphql-client';

export namespace AuthQuery {
  export async function login(email: string, password: string): Promise<FetchResult<UserSecretDto>> {
    console.log({
      email, password
    })
    return client.mutate<UserSecretDto>({
      mutation: gql`
        mutation{
          authenticate(input:{email:"${email}", password:"${password}"}) {
            jwtToken
          }
        }`
    })
  }
}

