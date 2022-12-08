import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'core/services/API';
import IPhoto from '../../interfaces/photo';

export const fetchPhotos = createAsyncThunk('photo/fetchPhotos', async () => {
  try {
    const response = await API.get('/api/photos') as IPhoto[];
    return response;
  } catch (error) {
    return error;
  }
});
