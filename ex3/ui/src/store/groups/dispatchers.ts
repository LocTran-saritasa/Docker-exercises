import { createComposeActionFn } from 'src/utils/createComposeAction';
import { AppError } from 'src/models/appError';
import { Group } from 'src/models/group';

export namespace GroupsActions {
  const composeAction = createComposeActionFn('groups');

  export const get = composeAction('get');
  export const getSuccess = composeAction<Group[]>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');
  export const cancelGet = composeAction('cancelGet');
}
