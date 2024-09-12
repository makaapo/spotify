import {createSlice} from '@reduxjs/toolkit';
import {Album} from '../../types';
import {getAlbumsByArtist} from './albumThunks';



export interface albumsState {
  albums: Album[];
  isLoading: boolean;
}

const initialState: albumsState = {
  albums: [],
  isLoading: false,
};



const AlbumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbumsByArtist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlbumsByArtist.fulfilled, (state, {payload: albums }) => {
      state.isLoading = false;
      state.albums = albums;
    });
    builder.addCase(getAlbumsByArtist.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumsFetching: (state) => state.isLoading,
  },
});


export const AlbumsReducer = AlbumsSlice.reducer;


export const {
  selectAlbums,
  selectAlbumsFetching,

} = AlbumsSlice.selectors;