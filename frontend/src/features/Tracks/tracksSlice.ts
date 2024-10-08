import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../../types';
import { createTrack, deleteTrack, getTracksByAlbum, publishTrack } from './tracksThunks';

interface tracksState {
  tracks: Track[];
  isLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
}

const initialState: tracksState = {
  tracks: [],
  isLoading: false,
  publishLoading: false,
  deleteLoading: false,
  createLoading: false,
};

const TracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracksByAlbum.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTracksByAlbum.fulfilled, (state, { payload: tracks }) => {
      state.isLoading = false;
      state.tracks = tracks;
    });
    builder.addCase(getTracksByAlbum.rejected, (state) => {
      state.isLoading = false;
    });
    builder
      .addCase(publishTrack.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(publishTrack.fulfilled, (state) => {
        state.publishLoading = false;
      })
      .addCase(publishTrack.rejected, (state) => {
        state.publishLoading = false;
      });

    builder
      .addCase(deleteTrack.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(createTrack.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.createLoading = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.isLoading,
    selectTrackPublishLoading: (state) => state.publishLoading,
    selectTrackDeleteLoading: (state) => state.deleteLoading,
    selectTrackCreateLoading: (state) => state.createLoading,
  },
});

export const TracksReducer = TracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,
  selectTrackPublishLoading,
  selectTrackDeleteLoading,
  selectTrackCreateLoading,
} = TracksSlice.selectors;
