import {createSlice} from '@reduxjs/toolkit';
import {Artist} from '../../types';
import {getArtistById, getArtists} from './artistsThunks';

export interface artistsState {
  artists: Artist[];
  artist: Artist | null;
  isLoading: boolean;
}

const initialState: artistsState = {
  artists: [],
  artist: null,
  isLoading: false,
};

const ArtistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArtists.fulfilled, (state, {payload: artists }) => {
      state.isLoading = false;
      state.artists = artists;
    });
    builder.addCase(getArtists.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getArtistById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArtistById.fulfilled, (state, {payload: artist }) => {
      state.isLoading = false;
      state.artist = artist;
    });
    builder.addCase(getArtistById.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.isLoading,
    selectOneArtist: state => state.artist,
  },
});


export const ArtistsReducer = ArtistsSlice.reducer;

export const {
  selectArtists,
  selectArtistsFetching,
  selectOneArtist


} = ArtistsSlice.selectors;