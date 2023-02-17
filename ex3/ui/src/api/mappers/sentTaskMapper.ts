import { SentTask } from 'src/models/task';

import { SentTaskDto } from '../dtos/taskDto';

import { IMapperFromDto } from './mappers';
import { taskMapper } from './taskMapper';

/** Sent task mapper. */
class SentTaskMapper implements IMapperFromDto<SentTaskDto, SentTask> {

  /**
   * Map sent task from dto.
   * @param dto Sent task dto.
   */
  public fromDto(dto: SentTaskDto): SentTask {
    return new SentTask({
      ...taskMapper.fromDto(dto),
      sentAt: dto.sentAt ? new Date(dto.sentAt) : null,
      groupId: dto.groupId ?? null,
    });
  }
}

export const sentTaskMapper = new SentTaskMapper();
