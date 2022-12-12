import {  AnyAction, AsyncThunk, createSlice } from '@reduxjs/toolkit';
import IAlbum from 'shared/interfaces/album';
import { createAlbum, fetchAlbums, removeAlbum, updateAlbum } from './ActionCreators';

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
  albums: IAlbum[];
  error: IError;
};

const initialState: IState = {
  status: 'idle',
  albums: [],
  error: { code: 0, message: '' },
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      if (action.payload as IAlbum[]) {
        state.albums = action.payload as IAlbum[];
        state.status = 'succeeded';
      }
    });
    builder.addCase(createAlbum.fulfilled, (state, action) => {
      state.albums.push(action.payload as IAlbum);
    });
    builder.addCase(updateAlbum.fulfilled, (state, action) => {
      state.albums.forEach((el) =>
        el.id === action.payload.id ? el : action.payload
      );
    });
    builder.addCase(removeAlbum.fulfilled, (state, action) => {
      state.albums = state.albums.filter((el) => el.id !== action.payload.id);
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

export default albumSlice.reducer;
