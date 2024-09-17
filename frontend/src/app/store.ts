import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {ArtistsReducer} from '../features/Artists/artistsSlice';
import {AlbumsReducer} from '../features/Albums/albumSlice';
import {TracksReducer} from '../features/Tracks/tracksSlice';
import {usersReducer} from '../features/User/usersSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import {TracksHistoryReducer} from '../features/TrackHistory/TrackHistorySlice';

const usersPersistConfig = {
  key: 'mySpotify:users',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  artists: ArtistsReducer,
  albums: AlbumsReducer,
  tracks: TracksReducer,
  trackHistory: TracksHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;