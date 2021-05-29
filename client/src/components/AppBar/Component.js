import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import withWidth from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(0)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  headerLink: {
    cursor: "pointer"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function MenuAppBar(props) {
  const classes = useStyles();
  const { width } = props;

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
    <div
      className={classes.list}
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

    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          {(typeof user !== "undefined" && user !== null && user.superuser === true) ? (
            <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          ) : ( null )}

          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {sideList('left')}
          </SwipeableDrawer>

          <Typography onClick={handleRandomlyRead} variant="h6" className={classes.title}>
            <span className={classes.headerLink}>Randomly Read</span>
          </Typography>

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
                {(width !== "lg" && width !== "xl") && (<MenuItem onClick={handleFocusWords}>Words</MenuItem>)}
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
    </div>
  );
}


MenuAppBar.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(MenuAppBar);
