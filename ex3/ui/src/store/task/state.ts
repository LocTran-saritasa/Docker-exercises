import { AppError } from 'src/models/appError';
import { Task } from 'src/models/task';

/** Tasks state. */
export interface TasksState {

  /** Tasks list. */
  readonly tasks: Task[];

  /** Error. */
  readonly error?: AppError;

  /** Whether tasks are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: TasksState = {
  isLoading: false,
  tasks: [],
};
