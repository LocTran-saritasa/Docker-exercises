import { Group } from 'src/models/group';
import { groupMapper } from '../mappers/groupMapper';
import { GroupQuery } from './queries/group';

export namespace GroupApiService {

  /** Fetches a list of groups. */
  export async function fetchGroups(): Promise<Group[]> {
    console.log('go')
    const { data } = await GroupQuery.getGroups();
    if (data == null) {
      throw new Error()
    }
    return data.allGroups.nodes.map(dto => groupMapper.fromDto(dto));
  }
}
