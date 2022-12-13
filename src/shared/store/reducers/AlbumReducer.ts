import {  createSlice } from '@reduxjs/toolkit';
import { fulfilledAction, isFulfilledAction, isPendingAction, isRejectedAction, pendingAction, rejectedAction } from '..';
import { createAlbum, fetchAlbums, removeAlbum, updateAlbum } from './ActionCreators';
import { IState } from './types';

const initialState: IState = {
  status: 'idle',
  data: [],
  errorMessage: '',
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
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
    builder.addMatcher(isPendingAction, pendingAction);
    builder.addMatcher(isRejectedAction, rejectedAction);
    builder.addMatcher(isFulfilledAction, fulfilledAction);
  },
});

export default albumSlice.reducer;
