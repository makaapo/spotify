import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {Artist} from '../../types';


export const getArtists = createAsyncThunk<Artist[]>(
  'artists/get-all',
  async () => {
    const {data: artist} = await axiosApi.get<Artist[]>('/artists');
    return artist;
  });