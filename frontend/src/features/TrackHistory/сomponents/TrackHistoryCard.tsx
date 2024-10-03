import React from 'react';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { TrackHistory } from '../../../types';
import dayjs from 'dayjs';

interface Props {
  trackHistory: TrackHistory;
}

const TrackHistoryCard: React.FC<Props> = ({ trackHistory }) => {
  const date = dayjs(trackHistory.datetime).format('DD.MM.YYYY HH:mm:ss');
  const artistName = trackHistory.track.album.artist?.title;

  return (
    <>
      <Grid container alignItems="center" gap={3} py={2} pr={2}>
        <Grid item>
          <IconButton>
            <PlayCircleIcon sx={{ color: 'seagreen' }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6" fontWeight="bold">
            {trackHistory.track?.title}
          </Typography>
        </Grid>
        <Grid item flexGrow={1}>
          <Typography variant="body1" color="gray">
            by {artistName || 'Unknown Artist'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{date}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default TrackHistoryCard;
