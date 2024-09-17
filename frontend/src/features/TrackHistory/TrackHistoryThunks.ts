import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {TrackHistory} from '../../types';

export const postTrackToHistory = createAsyncThunk<void, string, {state: RootState}>(
  'track-history/post',
  async (id: string, {getState}) => {
    const state = getState();
    const token = state?.users?.user?.token;
    if (token) {
      await axiosApi.post(`track-history`, {track: id}, {
        headers: {'Authorization': `Bearer ${token}`},
      });
    }
  }
);

export const getTrackToHistory = createAsyncThunk<TrackHistory[], void, {state: RootState}>(
  'track-history/get',
  async (_arg, {getState}) => {
    const state = getState();
    const token = state?.users?.user?.token;
    if (token) {
      const {data: trackHistory} = await axiosApi.get<TrackHistory[]>('track-history', {
        headers: {'Authorization': `Bearer ${token}`},
      });
      return trackHistory;
    }
    return [];
  }
);
