import { Group } from 'src/models/group';
import { SendTaskData, SentTask } from 'src/models/task';

import { sentTaskMapper } from '../mappers/sentTaskMapper';
import { taskMapper } from '../mappers/taskMapper';

import { TaskQuery } from './queries/task';

export namespace TaskApiService {

  /**
   * Fetches a list of tasks.
   * @param groupId Group id.
   */
  export async function fetchTasks(groupId: Group['id']): Promise<SentTask[]> {
    const { data } = await TaskQuery.getTasksByGroupId(groupId);
    if (data == null) {
      throw new Error();
    }
    return data.sentTasks.nodes.map(dto => sentTaskMapper.fromDto(dto));
  }

  /**
   * Send task to group.
   * @param sendData Send task data.
   */
  export async function sendTask(sendData: SendTaskData): Promise<SentTask[]> {
    const { data } = await TaskQuery.sendTask(taskMapper.toSendDataDto(sendData));
    if (data == null) {
      throw new Error();
    }
    return data.sentTasks.nodes.map(dto => sentTaskMapper.fromDto(dto));
  }
}
