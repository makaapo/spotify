import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album} from '../../types';

export const getAlbumsByArtist = createAsyncThunk<Album[], string>(
  'albums/get-by-artist',
  async (ArtistId) => {
    const { data: albums } = await axiosApi.get<Album[]>(`albums?${ArtistId}`);
    return albums;
  }
);