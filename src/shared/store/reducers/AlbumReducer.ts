import { createSlice } from '@reduxjs/toolkit';

type IAlbum = {
  album: number[];
};

const initialState: IAlbum = {
  album: [],
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default albumSlice.reducer;
