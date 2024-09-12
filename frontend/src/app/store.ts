import { configureStore } from '@reduxjs/toolkit';
import {ArtistsReducer} from '../features/Artists/artistsSlice';
import {AlbumsReducer} from '../features/Album/albumSlice';

export const store = configureStore({
  reducer: {
    artists: ArtistsReducer,
    albums: AlbumsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;