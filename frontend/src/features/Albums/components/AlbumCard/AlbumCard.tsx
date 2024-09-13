import React from 'react';
import {Card, CardMedia, CardActionArea, Typography, Box} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {Album} from '../../../../types';
import {API_URL} from '../../../../contans';
import NoAlbumImage from '../../../../assets/no-album-image.webp';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({album}) => {
  const cardImage = album.image ? `${API_URL}/${album.image}` : NoAlbumImage;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 300,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '8',
      }}
    >
      <CardActionArea
        component={NavLink}
        to={`/tracks/${album._id}?artist=${album.artist._id}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 2,
        }}
      >
        <CardMedia
          component="img"
          image={cardImage}
          alt={album.title}
          sx={{
            width: '100%',
            height: 200,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{fontWeight: 'bold'}}
          >
            {album.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            {album.release}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default AlbumCard;
