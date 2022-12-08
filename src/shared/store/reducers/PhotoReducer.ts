import { createSlice } from '@reduxjs/toolkit';
import IPhoto from 'shared/interfaces/photo';
import { fetchPhotos } from './ActionCreators';

type IState = {
  status: string;
  photos: IPhoto[];
};

const initialState: IState = {
  status: 'idle',
  photos: [],
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.photos = action.payload as IPhoto[];
    });
  },
});

export default photoSlice.reducer;
