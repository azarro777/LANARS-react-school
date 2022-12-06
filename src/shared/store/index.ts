import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AlbumReducer from './reducers/AlbumReducer';
import PhotoReducer from './reducers/PhotoReducer';

const rootReducer = combineReducers({
  AlbumReducer,
  PhotoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

