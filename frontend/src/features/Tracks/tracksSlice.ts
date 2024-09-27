import {createSlice} from '@reduxjs/toolkit';
import {Track, ValidationError} from '../../types';
import {createTrack, deleteTrack, getTracksByAlbum, publishTrack} from './tracksThunks';


interface tracksState {
  tracks: Track[];
  isLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: tracksState = {
  tracks: [],
  isLoading: false,
  publishLoading: false,
  deleteLoading: false,
  createLoading: false,
  createError: null,
};

const TracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracksByAlbum.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTracksByAlbum.fulfilled, (state, {payload: tracks}) => {
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
        state.createError = null;
        state.createLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, (state, {payload: error}) => {
        state.createError = error || null;
        state.createLoading = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.isLoading,
    selectTrackPublishLoading: state => state.publishLoading,
    selectTrackDeleteLoading: state => state.deleteLoading,
    selectTrackCreateLoading: state => state.createLoading,
    selectTrackCreateError: state => state.createError,
  },
});


export const TracksReducer = TracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,
  selectTrackPublishLoading,
  selectTrackDeleteLoading,
  selectTrackCreateLoading,
  selectTrackCreateError

} = TracksSlice.selectors;