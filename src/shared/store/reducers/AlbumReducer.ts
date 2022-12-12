import {  createSlice } from '@reduxjs/toolkit';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '..';
import { createAlbum, fetchAlbums, removeAlbum, updateAlbum } from './ActionCreators';
import { IState } from './types';

const initialState: IState = {
  status: 'idle',
  data: [],
  error: { code: 0, message: '' },
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
    builder.addMatcher(isPendingAction, (state) => {
      state.status = 'pending';
    });
    builder.addMatcher(isRejectedAction, (state) => {
      state.status = 'failed';
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.status = 'succeeded';
    });
  },
});

export default albumSlice.reducer;
