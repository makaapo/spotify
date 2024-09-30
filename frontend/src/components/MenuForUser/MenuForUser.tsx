import React, {useState} from 'react';
import {IconButton, Menu, MenuItem, ListItemIcon, ListItemText} from '@mui/material';
import PendingIcon from '@mui/icons-material/Pending';
import ClearIcon from '@mui/icons-material/Clear';
import PublishIcon from '@mui/icons-material/Publish';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/User/usersSlice';

interface Props {
  onPublish?: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
  isPublished?: boolean;
  isDeleting: boolean;
  isPublishing: boolean;
}

const MenuForUser: React.FC<Props> = (
  {onPublish,
    onDelete,
    isPublished = true,
    isDeleting,
    isPublishing
  }) => {
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () =>
    setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{color: 'primary.main'}}>
        <PendingIcon />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        sx={{mt: 2}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {user && user.role === 'admin' && !isPublished && (
          <MenuItem
            onClick={onPublish}
            disabled={isPublishing}
            sx={{'&:hover': {bgcolor: 'primary.light'}}}>
            <ListItemIcon>
              <PublishIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Publish" />
          </MenuItem>
        )}
        <MenuItem
          onClick={onDelete}
          disabled={isDeleting}
          sx={{'&:hover': {bgcolor: 'error.light'}}}>
          <ListItemIcon>
            <ClearIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuForUser;
