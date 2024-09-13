import React, {useEffect} from 'react';
import {getArtists} from './artistsThunks';
import {CircularProgress, Grid, Typography, Box} from '@mui/material';
import ArtistCard from './components/ArtistCard/ArtistCard';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtists, selectArtistsFetching} from './artistsSlice';

const Artists: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {artists.length === 0 ? (
            <Typography variant="body1" align="center">No artists yet</Typography>
          ) : (
            <Grid container spacing={3}>
              {artists.map((artist) => (
                <Grid item key={artist._id} xs={12} sm={6} md={4} lg={3}>
                  <ArtistCard artist={artist} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default Artists;
