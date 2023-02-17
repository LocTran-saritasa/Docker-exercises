import { Group } from 'src/models/group';

import { GroupDto } from '../dtos/groupDto';

import { IMapperFromDto } from './mappers';

/** Group mapper. */
class GroupMapper implements IMapperFromDto<GroupDto, Group> {

  /**
   * Map group from dto.
   * @param dto Group dto.
   */
  public fromDto(dto: GroupDto): Group {
    return new Group({
      id: dto.id,
      name: dto.name,
    });
  }
}

export const groupMapper = new GroupMapper();
