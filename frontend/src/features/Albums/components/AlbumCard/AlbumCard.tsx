import React, { useCallback } from 'react';
import { Card, CardMedia, CardActionArea, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Album } from '../../../../types';
import { API_URL } from '../../../../contans';
import NoAlbumImage from '../../../../assets/no-album-image.webp';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectAlbumDeleteLoading, selectAlbumPublishLoading } from '../../albumSlice';
import { deleteAlbum, getAlbumsByArtist, publishAlbum } from '../../albumThunks';
import MenuCard from '../../../../components/MenuForUser/MenuCard/MenuCard';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectAlbumPublishLoading);
  const deleteLoading = useAppSelector(selectAlbumDeleteLoading);
  const cardImage = album.image ? `${API_URL}/${album.image}` : NoAlbumImage;

  const onPublish = useCallback(async () => {
    await dispatch(publishAlbum(album._id));
    dispatch(getAlbumsByArtist(album.artist._id));
  }, [dispatch, album._id, album.artist._id]);

  const onDelete = useCallback(async () => {
    await dispatch(deleteAlbum(album._id));
    await dispatch(getAlbumsByArtist(album.artist._id));
  }, [dispatch, album._id, album.artist._id]);

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
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 1,
        }}
      >
        <MenuCard
          isPublishing={publishLoading}
          isDeleting={deleteLoading}
          isPublished={album.isPublished}
          onDelete={onDelete}
          onPublish={onPublish}
        />
      </Box>

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
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {album.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {album.release}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default AlbumCard;
