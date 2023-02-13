import { Task } from 'src/models/task';
import { TaskDto } from '../dtos/taskDto';
import { IMapperFromDto } from './mappers';

class TaskMapper implements IMapperFromDto<TaskDto, Task> {
  fromDto(dto: TaskDto): Task {
      return new Task({
        name: dto.name,
      })
  }
}

export const taskMapper = new TaskMapper();
