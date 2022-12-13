import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import AlbumReducer from './reducers/AlbumReducer';
import PhotoReducer from './reducers/PhotoReducer';
import {
  FulfilledAction,
  IState,
  PendingAction,
  RejectedAction,
} from './reducers/types';

const rootReducer = combineReducers({
  AlbumReducer,
  PhotoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

export function isFulfilledAction(
  action: AnyAction
): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

export function pendingAction(state: IState): void {
  state.status = 'pending';
  state.errorMessage = '';
}

export function rejectedAction(state: IState, action: AnyAction): void {
  state.status = 'failed';
  state.errorMessage = `Error ${action.payload.code} ${action.payload.message}`;
}

export function fulfilledAction(state: IState): void {
  state.status = 'succeeded';
  state.errorMessage = '';
}
