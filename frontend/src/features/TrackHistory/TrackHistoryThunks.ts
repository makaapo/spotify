import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {TrackHistory} from '../../types';

export const postTrackToHistory = createAsyncThunk<void, string, {state: RootState}>(
  'track-history/post',
  async (id: string) => {
    await axiosApi.post(`track-history`, {track: id});
  }
);

export const getTrackToHistory = createAsyncThunk<TrackHistory[], void, {state: RootState}>('track-history/get', async () => {
    const {data: trackHistory} = await axiosApi.get<TrackHistory[]>('track-history');
    return trackHistory;
  }
);
