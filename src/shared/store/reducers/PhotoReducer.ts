import { AnyAction, AsyncThunk, createSlice } from '@reduxjs/toolkit';
import IPhoto from 'shared/interfaces/photo';
import {
  createPhoto,
  fetchPhotos,
  removePhoto,
  updatePhoto,
} from './ActionCreators';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith('/pending');

type IError = {
  code: number;
  message: string;
};

type IState = {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  photos: IPhoto[];
  error: IError;
};

const initialState: IState = {
  status: 'idle',
  photos: [],
  error: { code: 0, message: '' },
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      if (action.payload as IPhoto[]) {
        state.photos = action.payload as IPhoto[];
        state.status = 'succeeded';
      }
    });
    builder.addCase(createPhoto.fulfilled, (state, action) => {
      state.photos.push(action.payload as IPhoto);
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.photos.forEach((el) =>
        el.id === action.payload.id ? el : action.payload
      );
    });
    builder.addCase(removePhoto.fulfilled, (state, action) => {
      state.photos = state.photos.filter((el) => el.id !== action.payload.id);
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.status = 'pending';
    });
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith('rejected'),
      (state) => {
        state.status = 'failed';
      }
    );
    builder.addMatcher<FulfilledAction>(
      (action) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.status = 'succeeded';
      }
    );
  },
});

export default photoSlice.reducer;
