import React from 'react';
import {Card, CardMedia, CardActionArea, Typography, Box} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {Artist} from '../../../../types';
import {API_URL} from '../../../../contans';
import NoArtistImage from '../../../../assets/noartistimage.webp';

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  const cardImage = artist.image ? `${API_URL}/${artist.image}` : NoArtistImage;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: '8',
      }}
    >
      <CardActionArea
        component={NavLink}
        to={`/albums/${artist._id}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <CardMedia
          component="img"
          image={cardImage}
          alt={artist.title}
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
            sx={{fontWeight: 'bold'}}
          >
            {artist.title}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;
