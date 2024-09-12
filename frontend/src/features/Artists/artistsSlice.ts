import {createSlice} from '@reduxjs/toolkit';
import {Artist} from '../../types';
import {getArtists} from './artistsThunks';

export interface artistsState {
  artists: Artist[];
  isLoading: boolean;
}

const initialState: artistsState = {
  artists: [],
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
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.isLoading,
  },
});


export const ArtistsReducer = ArtistsSlice.reducer;

export const {
  selectArtists,
  selectArtistsFetching,

} = ArtistsSlice.selectors;