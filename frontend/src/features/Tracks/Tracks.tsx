import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTracks, selectTracksFetching } from './tracksSlice';
import { getTracksByAlbum } from './tracksThunks';
import TrackCard from './components/TrackCard/TrackCard';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const { albumId } = useParams<{ albumId: string }>();
  const loading = useAppSelector(selectTracksFetching);

  useEffect(() => {
    if (albumId) {
      dispatch(getTracksByAlbum(albumId));
    }
  }, [dispatch, albumId]);

  return (
    <Box>
      {loading ? (
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
          {tracks.length === 0 ? (
            <Typography variant="body1" align="center">
              No tracks yet
            </Typography>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {tracks.map((track) => (
                <Grid item key={track._id} xs={12} sm={6} md={4} lg={3}>
                  <TrackCard track={track} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Tracks;
