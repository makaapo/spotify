import React, {useCallback} from 'react';
import {Box, Card, CircularProgress, Grid, IconButton, Typography} from '@mui/material';
import {Track} from '../../../../types';
import {useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {postTrackToHistory } from '../../../TrackHistory/TrackHistoryThunks';
import {selectUser} from '../../../User/usersSlice';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {selectAddTrackHistory} from '../../../TrackHistory/TrackHistorySlice';
import {selectTrackDeleteLoading, selectTrackPublishLoading} from '../../tracksSlice';
import {deleteTrack, getTracksByAlbum, publishTrack} from '../../tracksThunks';
import MenuCard from '../../../../components/MenuForUser/MenuCard/MenuCard';

interface Props {
  track: Track;
}

const TrackCard: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectTrackPublishLoading);
  const deleteLoading = useAppSelector(selectTrackDeleteLoading);
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

  const onPublish = useCallback(async () => {
    await dispatch(publishTrack(track._id));
    await dispatch(getTracksByAlbum(track.album._id));
  }, [dispatch]);

  const onDelete = useCallback(async () => {
    await dispatch(deleteTrack(track._id));
    await dispatch(getTracksByAlbum(track.album._id));
  }, [dispatch]);

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
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 25,
          right: 10,
          zIndex: 1,
        }}
      >
        <MenuCard
          isPublishing={publishLoading}
          isDeleting={deleteLoading}
          isPublished={track.isPublished}
          onDelete={onDelete}
          onPublish={onPublish}
        />
      </Box>
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
            sx={{ fontWeight: 'bold' }}
          >
            #{track.number} - {track.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Duration: {track.duration}
          </Typography>
        </Grid>
        <Grid item>
          {user && (
            isAddingTrackHistory === track._id ? (
              <CircularProgress size={30} />
            ) : (
              <IconButton onClick={() => clickHandler(track._id)}>
                <PlayCircleIcon sx={{color: 'seagreen', fontSize: 40}} />
              </IconButton>
            )
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default TrackCard;
