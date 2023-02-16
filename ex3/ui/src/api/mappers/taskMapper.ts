import { SendTaskData, Task } from 'src/models/task';
import { SendTaskDataDto, TaskDto } from '../dtos/taskDto';
import { IMapperFromDto } from './mappers';

class TaskMapper implements IMapperFromDto<TaskDto, Task> {
  fromDto(dto: TaskDto): Task {
      return new Task({
        id: dto.id,
        name: dto.name,
      })
  }

  toSendDataDto(data: SendTaskData): SendTaskDataDto {
    return {
      groupId: data.groupId,
      taskId: data.taskId,
    }
  }
}

export const taskMapper = new TaskMapper();
