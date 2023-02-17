import { SendTaskData, Task } from 'src/models/task';

import { SendTaskDataDto, TaskDto } from '../dtos/taskDto';

import { IMapperFromDto } from './mappers';

/** Task mapper. */
class TaskMapper implements IMapperFromDto<TaskDto, Task> {

  /**
   * Map task from dto.
   * @param dto Task dto.
   */
  public fromDto(dto: TaskDto): Task {
    return new Task({
      id: dto.id,
      name: dto.name,
    });
  }

  /**
   * Map to send data dto.
   * @param data Send task data.
   */
  public toSendDataDto(data: SendTaskData): SendTaskDataDto {
    return {
      groupId: data.groupId,
      taskId: data.taskId,
    };
  }
}

export const taskMapper = new TaskMapper();
