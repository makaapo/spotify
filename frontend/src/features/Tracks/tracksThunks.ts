import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {Track, TrackMutation, ValidationError} from '../../types';
import {isAxiosError} from 'axios';


export const getTracksByAlbum = createAsyncThunk<Track[], string>(
  'tracks/get-by-album-id',
  async (albumId) => {
    const { data: tracks } = await axiosApi.get<Track[]>(`tracks?album=${albumId}`);
    return tracks;
  }
);

export const createTrack = createAsyncThunk<void, TrackMutation, {rejectValue: ValidationError}
>('tracks/create', async (trackMutation, {rejectWithValue}) => {
  try {
    await axiosApi.post('/tracks', trackMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const publishTrack = createAsyncThunk<void, string>(
  'tracks/publish',
  async (id) => {
    await axiosApi.patch(`/tracks/${id}/togglePublished`);
  },
);
export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/deleteOne',
  async (id) => {
    await axiosApi.delete(`/tracks/${id}`);
  },
);