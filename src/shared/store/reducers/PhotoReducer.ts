import { createSlice } from '@reduxjs/toolkit';
import { fulfilledAction, isFulfilledAction, isPendingAction, isRejectedAction, pendingAction, rejectedAction } from '..';
import {
  createPhoto,
  fetchPhotos,
  removePhoto,
  updatePhoto,
} from './ActionCreators';
import { DataStataus, IState } from './types';

const initialState: IState = {
  status: DataStataus.IDLE,
  data: [],
  errorMessage: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.data = [...action.payload];
      } else {
        state.data = [action.payload];
      }
      state.status = DataStataus.SUCCEEDED;
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
    builder.addMatcher(isPendingAction('photos/'), pendingAction);
    builder.addMatcher(isRejectedAction('photos/'), rejectedAction);
    builder.addMatcher(isFulfilledAction('photos/'), fulfilledAction);
  },
});

export default photoSlice.reducer;
