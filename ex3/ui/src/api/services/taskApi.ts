import { Task } from 'src/models/task';
import { taskMapper } from '../mappers/taskMapper';
import { TaskQuery } from './queries/task';

export namespace TaskApiService {

  /** Fetches a list of tasks. */
  export async function fetchTasks(): Promise<Task[]> {
    const { data } = await TaskQuery.getTasks();
    if (data == null) {
      throw new Error()
    }
    return data.allTasks.nodes.map(dto => taskMapper.fromDto(dto));
  }
}
