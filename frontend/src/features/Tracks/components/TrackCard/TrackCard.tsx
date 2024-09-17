import React from 'react';
import {Card, CircularProgress, Grid, IconButton, Typography} from '@mui/material';
import {Track} from '../../../../types';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {postTrackToHistory} from '../../../TrackHistory/TrackHistoryThunks';
import {selectUser} from '../../../User/usersSlice';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {selectAddTrackHistory} from '../../../TrackHistory/TrackHistorySlice';

interface Props {
  track: Track;
}

const TrackCard: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAddingTrackHistory = useAppSelector(selectAddTrackHistory);

  const clickHandler = async (id: string) => {
    if (user) {
      try {
        dispatch(postTrackToHistory(id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '4px',
        mb: 2,
        p: 2,
        textAlign: 'center',
        height: '200px',
        boxShadow: 8,
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Grid item>
          <Typography
            variant="h6"
            component="h5"
            sx={{fontWeight: 'bold'}}>
            #{track.number} - {track.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{mt: 1}}>
            Duration: {track.duration}
          </Typography>
        </Grid>
        <Grid item>
          {isAddingTrackHistory === track._id ? (
            <CircularProgress size={30} />
          ) : (
            <IconButton onClick={() => clickHandler(track._id)}>
              <PlayCircleIcon sx={{ color: 'seagreen', fontSize: 40 }} />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default TrackCard;