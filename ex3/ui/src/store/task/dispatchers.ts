import { createComposeActionFn } from 'src/utils/createComposeAction';
import { AppError } from 'src/models/appError';
import { SentTask } from 'src/models/task';
import { Group } from 'src/models/group';

export namespace TasksActions {
  const composeAction = createComposeActionFn('tasks');

  export const get = composeAction('get');
  export const getByGroupId = composeAction<Group['id']>('getByGroupId');
  export const getSentTasksSuccess = composeAction<SentTask[]>('getSentTasksSuccess');
  export const getSuccess = composeAction<SentTask[]>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');
  export const cancelGet = composeAction('cancelGet');
}
