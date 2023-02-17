import { AppError } from 'src/models/appError';
import { Group } from 'src/models/group';

/** Groups state. */
export interface GroupsState {

  /** Groups list. */
  readonly groups: Group[];

  /** Error. */
  readonly error?: AppError;

  /** Whether groups are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: GroupsState = {
  isLoading: false,
  groups: [],
};
