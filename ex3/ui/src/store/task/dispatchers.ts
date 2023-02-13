import { createComposeActionFn } from 'src/utils/createComposeAction';
import { AppError } from 'src/models/appError';
import { Task } from 'src/models/task';

export namespace TasksActions {
  const composeAction = createComposeActionFn('tasks');

  export const get = composeAction('get');
  export const getSuccess = composeAction<Task[]>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');
  export const cancelGet = composeAction('cancelGet');
}
