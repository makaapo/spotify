import {User} from '../../types';
import React, {useState} from 'react';
import {Avatar, Grid, IconButton, Menu, MenuItem, Stack, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import RestoreIcon from '@mui/icons-material/Restore';
import {logout} from '../../features/User/usersThunks';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppDispatch} from '../../app/hooks';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import {getArtists} from '../../features/Artists/artistsThunks';
import {API_URL} from '../../contans';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen= Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(getArtists());
  };

  return (
    <Grid item>
      <Stack direction="row" alignItems="center">
        <Typography>{user.displayName}</Typography>
        <IconButton
          onClick={handleClick}
          sx={{ display: 'flex', gap: 1 }}
          disableRipple
        >
          <Avatar
            alt={user.displayName}
            src={`${API_URL}/${user.avatar}`}
            sx={{ width: 24, height: 24 }}
          />
        </IconButton>
      </Stack>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
      <MenuItem onClick={() => navigate('/track/new')}>
          <MusicNoteIcon sx={{mr: 2}} />
          New Track
        </MenuItem>
        <MenuItem onClick={() => navigate('/album/new')}>
          <LibraryMusicIcon sx={{mr: 2}} />
          New Album
        </MenuItem>
        <MenuItem onClick={() => navigate('/artist/new')}>
          <SpatialAudioOffIcon sx={{mr: 2}} />
          New Artist
        </MenuItem>
        <MenuItem onClick={() => navigate('/track-history')}>
          <RestoreIcon sx={{mr: 2}} />
          Track History
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{mr: 2}} />
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;