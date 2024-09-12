import React from 'react';
import {Card, CardMedia, CardActionArea, Typography, Box} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {Album} from '../../types';
import {API_URL} from '../../contans';
import NoArtistImage from '../../assets/noartistimage.webp';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({album}) => {
  const cardImage = album.image ? `${API_URL}/${album.image}` : NoArtistImage;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <CardActionArea
        component={NavLink}
        to={`/tracks/${album._id}?artist=${album.artist._id}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <CardMedia
          component="img"
          image={cardImage}
          alt={album.title}
          sx={{
            width: 80,
            height: 80,
            marginRight: 2,
            borderRadius: 1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold' }}
          >
            {album.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {album.release}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default AlbumCard;
