import { configureStore } from '@reduxjs/toolkit';
import {ArtistsReducer} from '../features/Artists/artistsSlice';

export const store = configureStore({
  reducer: {
    artists: ArtistsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;