import React from 'react';
import { Chip, Grid } from '@mui/material';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../../features/User/usersSlice';
import MenuForUser from '../MenuForUser';

interface Props {
  onPublish?: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
  isPublished?: boolean;
  isDeleting: boolean;
  isPublishing: boolean;
}

const MenuCard: React.FC<Props> = (
  {onPublish,
    onDelete,
    isPublished = true,
    isDeleting,
    isPublishing,
  }) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      {user && user.role === 'user' && !isPublished && (
        <Grid container justifyContent="space-between" alignItems="center">
          <Chip label="Unpublished" color="error" size="small" />
          <MenuForUser
            onDelete={onDelete}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
          />
        </Grid>
      )}

      {user && user.role === 'admin' && !isPublished && (
        <Grid container justifyContent="space-between" alignItems="center">
          <Chip label="Unpublished" color="error" size="small" />
          <MenuForUser
            onPublish={onPublish}
            onDelete={onDelete}
            isPublished={isPublished}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
          />
        </Grid>
      )}

      {user && user.role === 'admin' && isPublished && (
        <Grid container justifyContent="flex-end" alignItems="center">
          <MenuForUser
            onDelete={onDelete}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
          />
        </Grid>
      )}
    </>
  );
};

export default MenuCard;