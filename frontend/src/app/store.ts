import { configureStore } from '@reduxjs/toolkit';
import {ArtistsReducer} from '../features/Artists/artistsSlice';
import {AlbumsReducer} from '../features/Albums/albumSlice';
import {TracksReducer} from '../features/Tracks/tracksSlice';
import {usersReducer} from '../features/User/usersSlice';

export const store = configureStore({
  reducer: {
    artists: ArtistsReducer,
    albums: AlbumsReducer,
    tracks: TracksReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;