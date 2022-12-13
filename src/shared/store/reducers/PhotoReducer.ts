import { createSlice } from '@reduxjs/toolkit';
import { fulfilledAction, isFulfilledAction, isPendingAction, isRejectedAction, pendingAction, rejectedAction } from '..';
import {
  createPhoto,
  fetchPhotos,
  removePhoto,
  updatePhoto,
} from './ActionCreators';
import { IState } from './types';

const initialState: IState = {
  status: 'idle',
  data: [],
  errorMessage: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(createPhoto.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.data.forEach((el) =>
        el.id === action.payload.id ? el : action.payload
      );
    });
    builder.addCase(removePhoto.fulfilled, (state, action) => {
      state.data = state.data.filter((el) => el.id !== action.payload.id);
    });
    builder.addMatcher(isPendingAction, pendingAction);
    builder.addMatcher(isRejectedAction, rejectedAction);
    builder.addMatcher(isFulfilledAction, fulfilledAction);
  },
});

export default photoSlice.reducer;
