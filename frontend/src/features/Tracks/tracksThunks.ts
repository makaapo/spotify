import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Track, TrackMutation } from '../../types';

export const getTracksByAlbum = createAsyncThunk<Track[], string>('tracks/get-by-album-id', async (albumId) => {
  const { data: tracks } = await axiosApi.get<Track[]>(`tracks?album=${albumId}`);
  return tracks;
});

export const createTrack = createAsyncThunk<void, TrackMutation>('tracks/create', async (trackMutation) => {
  await axiosApi.post('/tracks', trackMutation);
});

export const publishTrack = createAsyncThunk<void, string>('tracks/publish', async (id) => {
  await axiosApi.patch(`/tracks/${id}/togglePublished`);
});
export const deleteTrack = createAsyncThunk<void, string>('tracks/deleteOne', async (id) => {
  await axiosApi.delete(`/tracks/${id}`);
});
