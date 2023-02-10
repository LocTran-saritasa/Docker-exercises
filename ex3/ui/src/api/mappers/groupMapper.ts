import { Group } from 'src/models/group';
import { GroupDto } from '../dtos/groupDto';
import { IMapperFromDto } from './mappers';

class GroupMapper implements IMapperFromDto<GroupDto, Group> {
  fromDto(dto: GroupDto): Group {
      return new Group({
        name: dto.name,
      })
  }
}

export const groupMapper = new GroupMapper();
