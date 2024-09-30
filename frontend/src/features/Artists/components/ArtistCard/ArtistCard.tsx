import React, {useCallback} from 'react';
import {Card, CardMedia, CardActionArea, Typography, Box} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {Artist} from '../../../../types';
import {API_URL} from '../../../../contans';
import NoArtistImage from '../../../../assets/noartistimage.webp';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {selectArtistDeleteLoading, selectArtistPublishLoading} from '../../artistsSlice';
import {deleteArtist, getArtists, publishArtist} from '../../artistsThunks';
import MenuCard from '../../../../components/MenuForUser/MenuCard/MenuCard';

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectArtistPublishLoading);
  const deleteLoading = useAppSelector(selectArtistDeleteLoading);
  const cardImage = artist.image ? `${API_URL}/${artist.image}` : NoArtistImage;

  const onPublish = useCallback(async () => {
    await dispatch(publishArtist(artist._id));
    await dispatch(getArtists());
  }, [dispatch, artist._id]);

  const onDelete = useCallback(async () => {
    await dispatch(deleteArtist(artist._id));
    await dispatch(getArtists());
  }, [dispatch, artist._id]);

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: '8',
        position: 'relative',
      }}
    >
      <CardActionArea
        component={NavLink}
        to={`/albums/${artist._id}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          flexGrow: 1,
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
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <MenuCard
          isPublished={artist.isPublished}
          onDelete={onDelete}
          onPublish={onPublish}
          isPublishing={publishLoading}
          isDeleting={deleteLoading}
        />
      </Box>
    </Card>
  );
};

export default ArtistCard;
