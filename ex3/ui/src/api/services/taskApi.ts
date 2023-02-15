import { Group } from 'src/models/group';
import { Task } from 'src/models/task';
import { sentTaskMapper } from '../mappers/sentTaskMapper';
import { taskMapper } from '../mappers/taskMapper';
import { TaskQuery } from './queries/task';

export namespace TaskApiService {

  /** Fetches a list of tasks. */
  export async function fetchTasks(groupId: Group['id']): Promise<Task[]> {
    const { data } = await TaskQuery.getTasksByGroupId(groupId);
    if (data == null) {
      throw new Error()
    }
    return data.sentTasks.nodes.map(dto => sentTaskMapper.fromDto(dto));
  }
}
