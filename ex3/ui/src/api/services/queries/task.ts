import { FetchResult, gql } from '@apollo/client';
import { SendTaskDataDto, SentTasksDto, UpdatedTaskDto } from 'src/api/dtos/taskDto';
import { Group } from 'src/models/group';

import { client } from '../graphql-client';

export namespace TaskQuery {

  /**
   * Get task by group id.
   * @param id Group's id.
   */
  export function getTasksByGroupId(id: Group['id']): Promise<FetchResult<SentTasksDto>> {
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
        `,
    });
  }

  /**
   * Send task.
   * @param data Send task data.
   */
  export function sendTask(data: SendTaskDataDto): Promise<FetchResult<UpdatedTaskDto>> {
    return client.mutate<UpdatedTaskDto>({
      mutation: gql`
        mutation {
          sendTaskToGroup(input: {groupid: ${data.groupId}, taskid: ${data.taskId}}) {
            query {
              sentTasks(groupid: ${data.groupId}) {
                nodes {
                  groupId
                  id
                  name
                  sentAt
                }
              }
            }
          }
        }`,
    });
  }
}
