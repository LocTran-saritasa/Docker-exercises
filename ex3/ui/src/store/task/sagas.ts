import { SagaIterator } from 'redux-saga';
import {
  call, cancel, cancelled, fork, put, take,
} from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { TaskApiService } from 'src/api/services/taskApi';
import { Task } from 'src/models/task';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { TasksActions } from './dispatchers';

/** Worker saga which fetches tasks. */
function* fetchTasksWorker(): SagaIterator {
  const abortController = new AbortController();
  try {
    const tasks: Task[] = yield call(TaskApiService.fetchTasks);
    yield put(TasksActions.getSuccess(tasks));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(TasksActions.getFailure(appError));
    }

    throw error;
  } finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

/** Watcher saga for tasks. */
export function* tasksSaga(): SagaIterator {
  while (yield take(TasksActions.get.type)) {
    const task = yield fork(fetchTasksWorker);
    yield take(TasksActions.cancelGet.type);
    yield cancel(task);
  }
}
