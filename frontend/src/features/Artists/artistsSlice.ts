import {createSlice} from '@reduxjs/toolkit';
import {Artist, ValidationError} from '../../types';
import {createArtist, deleteArtist, getArtistById, getArtists, publishArtist} from './artistsThunks';

export interface artistsState {
  artists: Artist[];
  artist: Artist | null;
  isLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: artistsState = {
  artists: [],
  artist: null,
  isLoading: false,
  publishLoading: false,
  deleteLoading: false,
  createLoading: false,
  createError: null,
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
    builder
      .addCase(publishArtist.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(publishArtist.fulfilled, (state) => {
        state.publishLoading = false;
      })
      .addCase(publishArtist.rejected, (state) => {
        state.publishLoading = false;
      });

    builder
      .addCase(deleteArtist.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(createArtist.pending, (state) => {
        state.createError = null;
        state.createLoading = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createArtist.rejected, (state, {payload: error }) => {
        state.createError = error || null;
        state.createLoading = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.isLoading,
    selectOneArtist: state => state.artist,
    selectArtistPublishLoading: state => state.publishLoading,
    selectArtistDeleteLoading: state => state.deleteLoading,
    selectArtistCreateLoading: state => state.createLoading,
    selectArtistCreateError: state => state.createError,
  },
});


export const ArtistsReducer = ArtistsSlice.reducer;

export const {
  selectArtists,
  selectArtistsFetching,
  selectOneArtist,
  selectArtistPublishLoading,
  selectArtistDeleteLoading,
  selectArtistCreateLoading,
  selectArtistCreateError


} = ArtistsSlice.selectors;