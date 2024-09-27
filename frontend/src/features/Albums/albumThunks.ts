import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album, AlbumMutation, ValidationError} from '../../types';
import {isAxiosError} from 'axios';

export const getAlbumsByArtist = createAsyncThunk<Album[], string>(
  'albums/get-by-artist',
  async (artistId) => {
    const { data: albums } = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
    return albums;
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation, {rejectValue: ValidationError}
>('artists/create', async (albumMutation, {rejectWithValue}) => {
  try {
    const formData = new FormData();

    formData.append('artist', albumMutation.artist);
    formData.append('title', albumMutation.title);
    formData.append('release', albumMutation.release);

    if (albumMutation.image) {
      formData.append('image', albumMutation.image);
    }

    await axiosApi.post('albums', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const publishAlbum = createAsyncThunk<void, string>(
  'albums/publish',
  async (id) => {
    await axiosApi.patch(`/albums/${id}/togglePublished`);
  },
);
export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteOne',
  async (id) => {
    await axiosApi.delete(`/albums/${id}`);
  },
);