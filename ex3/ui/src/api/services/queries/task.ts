import { FetchResult, gql } from '@apollo/client';
import { SentTasksDto } from 'src/api/dtos/taskDto';
import { Group } from 'src/models/group';
import { client } from '../graphql-client';

export namespace TaskQuery {
  export async function getTasksByGroupId(id: Group['id']): Promise<FetchResult<SentTasksDto>> {
    return client.query<SentTasksDto>({
      query: gql`
        query MyQuery {
          sentTasks(groupid: ${id}) {
            nodes {
              id
              name
              groupId
              sentAt
            }
          }
        }
        `
    })
  }
}
