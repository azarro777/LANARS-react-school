import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'core/services/API';
import IAlbum from 'shared/interfaces/album';
import IPhoto from '../../interfaces/photo';

export const fetchPhotos = createAsyncThunk('photo/fetchPhotos', async (value: number[], {rejectWithValue}) => {
  try {
    const response = await API.get<IPhoto[]>(`/api/photos${value.length > 0 ? ('?ids=' + value.join('')) : ''}`);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createPhoto = createAsyncThunk('photo/createPhoto', async (photo: Omit<IPhoto, 'id'>, {rejectWithValue}) => {
  try {
    const response = await API.post<Omit<IPhoto, 'id'>>('/api/photos', photo);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updatePhoto = createAsyncThunk('photo/updatePhoto', async (photo: IPhoto, {rejectWithValue}) => {
  try {
    const response = await API.patch('/api/photos', photo) as IPhoto;
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const removePhoto = createAsyncThunk('photo/removePhoto', async (id: number[], {rejectWithValue}) => {
  try {
    const response = await API.delete(`/api/photos?ids=${id}`);
    return response;
  } catch (error) {
    rejectWithValue(error);
  }
});

export const fetchAlbums = createAsyncThunk('photo/fetchAlbums', async (value: number[], {rejectWithValue}) => {
  try {
    const response = await API.get<IAlbum[]>(`/api/albums${value.length > 0 ? ('?ids=' + value.join('')) : ''}`);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createAlbum = createAsyncThunk('photo/createAlbum', async (album: Omit<IAlbum, 'id'>, {rejectWithValue}) => {
  try {
    const response = await API.post<Omit<IAlbum, 'id'>>('/api/albums', album);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateAlbum = createAsyncThunk('photo/updateAlbum', async (album: IAlbum, {rejectWithValue}) => {
  try {
    const response = await API.patch('/api/albums', album) as IAlbum;
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const removeAlbum = createAsyncThunk('photo/removeAlbum', async (id: number[], {rejectWithValue}) => {
  try {
    const response = await API.delete(`/api/albums?ids=${id}`);
    return response;
  } catch (error) {
    rejectWithValue(error);
  }
});
