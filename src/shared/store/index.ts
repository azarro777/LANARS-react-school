import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import AlbumReducer from './reducers/AlbumReducer';
import PhotoReducer from './reducers/PhotoReducer';
import {
  DataStataus,
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

function typeOfReducer(action: AnyAction, type: string) {
  return action.type.startsWith(type);
}
const isPending = (action: AnyAction) => action.type.endsWith('/pending');
const isFulfilled = (action: AnyAction) => action.type.endsWith('/fulfilled');
const isRejected = (action: AnyAction) => action.type.endsWith('/rejected');

export function isPendingAction(type: string) {
  return function (action: AnyAction): action is PendingAction {
    return typeOfReducer(action, type) && isPending(action);
  };
}

export function isRejectedAction(type: string) {
  return function (action: AnyAction): action is RejectedAction {
    return typeOfReducer(action, type) && isRejected(action);
  };
}

export function isFulfilledAction(type: string) {
  return function (action: AnyAction): action is FulfilledAction {
    return typeOfReducer(action, type) && isFulfilled(action);
  };
}

export function pendingAction(state: IState): void {
  state.status = DataStataus.PENDING;
  state.errorMessage = '';
}

export function rejectedAction(state: IState, action: AnyAction): void {
  state.status = DataStataus.FAILED;
  state.errorMessage = `Error ${action.payload.code} ${action.payload.message}`;
}

export function fulfilledAction(state: IState): void {
  state.status = DataStataus.SUCCEEDED;
  state.errorMessage = '';
}
