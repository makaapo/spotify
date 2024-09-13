import React from 'react';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';
import playerPic from '../../../../assets/player.jpeg';
import {Track} from '../../../../types';

interface Props {
  track: Track;
}

const TrackCard: React.FC<Props> = ({track}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '4px',
        mb: 2,
        p: 2,
        textAlign: 'center',
        height: '320px',
        boxShadow: '8',
      }}
    >
      <CardMedia
        component="img"
        image={playerPic}
        alt={track._id}
        sx={{
          width: '100%',
          height: '150px',
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{mt: 1}}>
          Duration: {track.duration}
        </Typography>
        <Typography
          variant="h6"
          component="h5"
          sx={{fontWeight: 'bold'}}>
          #{track.number} - {track.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
