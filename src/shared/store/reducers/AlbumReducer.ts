import {  createSlice } from '@reduxjs/toolkit';
import { fulfilledAction, isFulfilledAction, isPendingAction, isRejectedAction, pendingAction, rejectedAction } from '..';
import { createAlbum, fetchAlbums, removeAlbum, updateAlbum } from './ActionCreators';
import { DataStataus, IState } from './types';

const initialState: IState = {
  status: DataStataus.IDLE,
  data: [],
  errorMessage: '',
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.data = [...action.payload];
      } else {
        state.data = [action.payload];
      }
      state.status = DataStataus.SUCCEEDED;
    });
    builder.addCase(createAlbum.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(updateAlbum.fulfilled, (state, action) => {
      state.data.forEach((el) =>
        el.id === action.payload.id ? el : action.payload
      );
    });
    builder.addCase(removeAlbum.fulfilled, (state, action) => {
      state.data = state.data.filter((el: { id: number }) => el.id !== action.payload.id);
    });
    builder.addMatcher(isPendingAction('album/'), pendingAction);
    builder.addMatcher(isRejectedAction('album/'), rejectedAction);
    builder.addMatcher(isFulfilledAction('album/'), fulfilledAction);
  },
});

export default albumSlice.reducer;
