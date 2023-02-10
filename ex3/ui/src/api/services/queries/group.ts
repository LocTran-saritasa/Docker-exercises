import { FetchResult, gql } from '@apollo/client';
import { AllGroupsDto } from 'src/api/dtos/groupDto';
import { client } from '../graphql-client';

export namespace GroupQuery {
  export async function getGroups(): Promise<FetchResult<AllGroupsDto>> {
    return client.query<AllGroupsDto>({
      query: gql`
        query GetGroups {
          allGroups {
            nodes {
              id
              name
            }
          }
        }`
    })
  }
}
