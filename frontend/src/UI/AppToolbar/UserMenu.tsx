import {User} from '../../types';
import React, {useState} from 'react';
import {Button, Grid, Menu, MenuItem} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import RestoreIcon from '@mui/icons-material/Restore';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen= Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <Grid item>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}!
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem onClick={() => navigate('/track-history')}>
          <RestoreIcon sx={{mr: 2}} />
          Track History
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;