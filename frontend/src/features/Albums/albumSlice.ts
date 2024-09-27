import {createSlice} from '@reduxjs/toolkit';
import {Album} from '../../types';
import {createAlbum, deleteAlbum, getAlbumsByArtist, publishAlbum} from './albumThunks';

export interface albumsState {
  albums: Album[];
  isLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
}

const initialState: albumsState = {
  albums: [],
  isLoading: false,
  publishLoading: false,
  deleteLoading: false,
  createLoading: false,
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
    builder
      .addCase(publishAlbum.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(publishAlbum.fulfilled, (state) => {
        state.publishLoading = false;
      })
      .addCase(publishAlbum.rejected, (state) => {
        state.publishLoading = false;
      });
    builder
      .addCase(deleteAlbum.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.deleteLoading = false;
      });
    builder
      .addCase(createAlbum.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.createLoading = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumsFetching: (state) => state.isLoading,
    selectAlbumPublishLoading: (state) => state.publishLoading,
    selectAlbumDeleteLoading: (state) => state.deleteLoading,
    selectAlbumCreateLoading: (state) => state.createLoading,
  },
});


export const AlbumsReducer = AlbumsSlice.reducer;


export const {
  selectAlbums,
  selectAlbumsFetching,
  selectAlbumPublishLoading,
  selectAlbumDeleteLoading,
  selectAlbumCreateLoading,

} = AlbumsSlice.selectors;