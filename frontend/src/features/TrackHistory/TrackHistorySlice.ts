import { createSlice } from '@reduxjs/toolkit';
import { TrackHistory } from '../../types';
import { getTrackToHistory, postTrackToHistory } from './TrackHistoryThunks';

export interface tracksHistoryState {
  isLoading: boolean;
  addLoading: string | false;
  trackHistory: TrackHistory[];
}

const initialState: tracksHistoryState = {
  isLoading: false,
  addLoading: false,
  trackHistory: [],
};

const TracksHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postTrackToHistory.pending, (state, { meta: { arg: id } }) => {
      state.addLoading = id;
    });
    builder.addCase(postTrackToHistory.fulfilled, (state) => {
      state.addLoading = false;
    });
    builder.addCase(postTrackToHistory.rejected, (state) => {
      state.addLoading = false;
    });
    builder.addCase(getTrackToHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTrackToHistory.fulfilled, (state, { payload: trackHistory }) => {
      state.trackHistory = trackHistory;
      state.isLoading = false;
    });
    builder.addCase(getTrackToHistory.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectTrackHistory: (state) => state.trackHistory,
    selectHistoryFetching: (state) => state.isLoading,
    selectAddTrackHistory: (state) => state.addLoading,
  },
});

export const TracksHistoryReducer = TracksHistorySlice.reducer;

export const { selectTrackHistory, selectHistoryFetching, selectAddTrackHistory } = TracksHistorySlice.selectors;
