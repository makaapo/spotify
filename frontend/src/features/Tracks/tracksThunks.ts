import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {Track} from '../../types';


export const getTracksByAlbum = createAsyncThunk<Track[], string>(
  'tracks/get-by-album-id',
  async (albumId) => {
    const { data: tracks } = await axiosApi.get<Track[]>(`tracks?album=${albumId}`);
    return tracks;
  }
);