import { FetchResult, gql } from '@apollo/client';
import { AllTasksDto } from 'src/api/dtos/taskDto';
import { client } from '../graphql-client';

export namespace TaskQuery {
  export async function getTasks(): Promise<FetchResult<AllTasksDto>> {
    return client.query<AllTasksDto>({
      query: gql`
        query GetTasks {
          allTasks {
            nodes {
              id
              name
            }
          }
        }`
    })
  }
}
