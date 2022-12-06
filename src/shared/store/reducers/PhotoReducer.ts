import { createSlice } from '@reduxjs/toolkit';

type IPhoto = {
  photo: number[];
};

const initialState: IPhoto = {
  photo: [],
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default photoSlice.reducer;
