import { AsyncThunk } from '@reduxjs/toolkit';
import IAlbum from 'shared/interfaces/album';
import IPhoto from 'shared/interfaces/photo';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export type IState = {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  data: (IAlbum | IPhoto)[];
  errorMessage: string;
};
