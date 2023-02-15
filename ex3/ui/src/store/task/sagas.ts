import { SagaIterator } from 'redux-saga';
import {
  call, cancel, cancelled, fork, put, take,
} from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { TaskApiService } from 'src/api/services/taskApi';
import { SentTask } from 'src/models/task';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { TasksActions } from './dispatchers';

/**
 * Worker saga which fetches tasks.
 * @param action - Fetch tasks action.
 */
function* fetchSentTasksWorker(action: ReturnType<typeof TasksActions.getByGroupId>): SagaIterator {
  const abortController = new AbortController();
  try {
    const sentTasks: SentTask[] = yield call(TaskApiService.fetchTasks, action.payload);
    yield put(TasksActions.getSentTasksSuccess(sentTasks));
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
  while (true) {
    const action = yield take(TasksActions.getByGroupId.type)
    const task = yield fork(fetchSentTasksWorker, action);
    yield take(TasksActions.cancelGet.type);
    yield cancel(task);
  }
}
