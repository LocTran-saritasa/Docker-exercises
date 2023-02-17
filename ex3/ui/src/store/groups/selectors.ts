import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectGroups = createSelector((state: RootState) => state.groups.groups, group => group);
