import { createSlice } from '@reduxjs/toolkit';

import { TasksActions } from './dispatchers';

import { initialState } from './state';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(TasksActions.get, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(TasksActions.getByGroupId, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(TasksActions.sendTask, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(TasksActions.getSuccess, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    })
    .addCase(TasksActions.getSentTasksSuccess, (state, action) => {
      state.sentTasks = action.payload;
      state.isLoading = false;
    })
    .addCase(TasksActions.sendTaskSuccess, (state, action) => {
      state.sentTasks = action.payload;
      state.isLoading = false;
    })
    .addCase(TasksActions.getFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(TasksActions.cancelGet, state => {
      state.error = undefined;
      state.isLoading = false;
    }),
});
