import { AsyncThunk } from '@reduxjs/toolkit';
import IAlbum from 'shared/interfaces/album';
import IPhoto from 'shared/interfaces/photo';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export enum DataStataus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export type IState = {
  status: DataStataus;
  data: (IAlbum | IPhoto)[];
  errorMessage: string;
};
