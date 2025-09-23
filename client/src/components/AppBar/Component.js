import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledRoot = styled('div')(({ theme }) => ({
  flexGrow: 1,
  marginBottom: theme.spacing(0)
}));

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1
}));

const StyledHeaderLink = styled('span')(({ theme }) => ({
  cursor: "pointer"
}));

const StyledList = styled('div')(({ theme }) => ({
  width: 250,
}));

function MenuAppBar(props) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    props.history.push('/Profile');
  };

  const handleFocusWords = () => {
    setAnchorEl(null);
    props.history.push('/FocusWords');
  };

  const handleLogout = () => {
    setAnchorEl(null);
    props.logout();
  };

  const handleLogin = () => {
    props.history.push('/login');
  };

  const handleRandomlyRead = () => {
    props.history.push('/');
  };

  const handleRoutineBuilder = () => {
    props.history.push('/RoutineBuilder');
  };

  const handleUserAdministration = () => {
    props.history.push('/Administration');
  };

  let user = props.user;

  const sideList = side => (
    <StyledList
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem onClick={handleRoutineBuilder} button key={"Routine Builder"}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={"Routine Builder"} />
        </ListItem>

        <ListItem onClick={handleUserAdministration} button key={"User Administration"}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={"Manage Users"} />
        </ListItem>
      </List>

    </StyledList>
  );

  return (
    <StyledRoot>
      <AppBar position="static">
        <Toolbar>

          {(typeof user !== "undefined" && user !== null && user.superuser === true) ? (
            <StyledMenuButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </StyledMenuButton>
          ) : ( null )}

          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {sideList('left')}
          </SwipeableDrawer>

          <StyledTitle onClick={handleRandomlyRead} variant="h6">
            <StyledHeaderLink>Fluency Shaping</StyledHeaderLink>
          </StyledTitle>

          {user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {!isLargeScreen && (<MenuItem onClick={handleFocusWords}>Words</MenuItem>)}
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button onClick={handleLogin} color="inherit">Login</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </StyledRoot>
  );
}

export default MenuAppBar;
