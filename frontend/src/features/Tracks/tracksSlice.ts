import {createSlice} from '@reduxjs/toolkit';
import {Track} from '../../types';
import {getTracksByAlbum} from './tracksThunks';


interface tracksState {
  tracks: Track[];
  isLoading: boolean;
}

const initialState: tracksState = {
  tracks: [],
  isLoading: false,
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
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.isLoading,
  },
});


export const TracksReducer = TracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,

} = TracksSlice.selectors;