import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectTasks = createSelector((state: RootState) => state.tasks.tasks, task => task);
export const selectSentTasks = createSelector((state: RootState) => state.tasks.sentTasks, sentTask => sentTask);
