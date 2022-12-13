import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import AlbumReducer from './reducers/AlbumReducer';
import PhotoReducer from './reducers/PhotoReducer';
import { FulfilledAction, IState, PendingAction, RejectedAction } from './reducers/types';

const rootReducer = combineReducers({
  AlbumReducer,
  PhotoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith('/pending');

export const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.endsWith('/rejected');

export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => action.type.endsWith('/fulfilled');

export const pendingAction = (state: IState): void => {
  state.status = 'pending';
  state.errorMessage = '';
};

export const rejectedAction = (state: IState, action: AnyAction): void => {
  state.status = 'failed';
  state.errorMessage = action.payload.message;
};

export const fulfilledAction = (state: IState): void => {
  state.status = 'succeeded';
  state.errorMessage = '';
};
