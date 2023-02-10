import { SagaIterator } from 'redux-saga';
import {
  call, cancel, cancelled, fork, put, take,
} from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { GroupApiService } from 'src/api/services/groupApi';
import { Group } from 'src/models/group';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { GroupsActions } from './dispatchers';

/** Worker saga which fetches groups. */
function* fetchGroupsWorker(): SagaIterator {
  const abortController = new AbortController();
  try {
    const groups: Group[] = yield call(GroupApiService.fetchGroups);
    yield put(GroupsActions.getSuccess(groups));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(GroupsActions.getFailure(appError));
    }

    throw error;
  } finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

/** Watcher saga for groups. */
export function* groupsSaga(): SagaIterator {
  while (yield take(GroupsActions.get.type)) {
    const task = yield fork(fetchGroupsWorker);
    yield take(GroupsActions.cancelGet.type);
    yield cancel(task);
  }
}
