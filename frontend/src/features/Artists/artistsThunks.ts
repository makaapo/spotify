import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {Artist, ArtistMutation} from '../../types';


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

export const createArtist = createAsyncThunk<void, ArtistMutation>
('artists/create', async (artistMutation) => {
    const formData = new FormData();

    formData.append('title', artistMutation.title);
    formData.append('description', artistMutation.description);

    if (artistMutation.image) {
      formData.append('image', artistMutation.image);
    }

    await axiosApi.post('/artists', formData);
});

export const publishArtist = createAsyncThunk<void, string>(
  'artists/publish',
  async (id) => {
    await axiosApi.patch(`/artists/${id}/togglePublished`);
  },
);
export const deleteArtist = createAsyncThunk<void, string>(
  'artists/deleteOne',
  async (id) => {
    await axiosApi.delete(`/artists/${id}`);
  },
);