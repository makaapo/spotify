import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAlbumsByArtist } from './albumThunks';
import { getArtistById } from '../Artists/artistsThunks';
import { selectArtistsFetching, selectOneArtist } from '../Artists/artistsSlice';
import { selectAlbums, selectAlbumsFetching } from './albumSlice';
import AlbumCard from './components/AlbumCard/AlbumCard';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const Albums: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const albumsLoading = useAppSelector(selectAlbumsFetching);
  const artistLoading = useAppSelector(selectArtistsFetching);
  const artistOfAlbum = useAppSelector(selectOneArtist);

  useEffect(() => {
    if (artistId) {
      dispatch(getAlbumsByArtist(artistId));
      dispatch(getArtistById(artistId));
    }
  }, [dispatch, artistId]);

  return (
    <Box>
      {albumsLoading || artistLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography textAlign="center" variant="h4" component="h1" mb="3">
            Artist: {artistOfAlbum ? artistOfAlbum.title : 'Not found'}
          </Typography>
          <hr />
          {albums.length === 0 ? (
            <Typography variant="body1" align="center">
              No albums yet
            </Typography>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {albums.map((album) => (
                <Grid item key={album._id} xs={12} md={6}>
                  <AlbumCard album={album} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Albums;
