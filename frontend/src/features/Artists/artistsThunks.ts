import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {Artist} from '../../types';


export const getArtists = createAsyncThunk<Artist[]>(
  'artists/get-all',
  async () => {
    const {data: artist} = await axiosApi.get<Artist[]>('/artists');
    return artist;
  });

export const getArtistById = createAsyncThunk<Artist, string>(
  'artists/get-by-id',
  async (artistId) => {
  const {data: artist} = await axiosApi.get<Artist>((`/artists/${artistId}`));
  return artist;
});