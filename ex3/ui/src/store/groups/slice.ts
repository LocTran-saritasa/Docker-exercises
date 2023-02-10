import { createSlice } from '@reduxjs/toolkit';

import { GroupsActions } from './dispatchers';

import { initialState } from './state';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(GroupsActions.get, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(GroupsActions.getSuccess, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    })
    .addCase(GroupsActions.getFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(GroupsActions.cancelGet, state => {
      state.error = undefined;
      state.isLoading = false;
    }),
});
