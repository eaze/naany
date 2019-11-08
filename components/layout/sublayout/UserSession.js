import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { AccountCircle } from '@material-ui/icons';
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { useUserSessionContext } from './../../../contextes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loginButton: {
    '& a': {
      textDecoration: 'none',
      '&:visited': {
        color: 'inherit',
      },
    },
  },
}));

function UserSession() {
  const classes = useStyles();
  const parentEl = React.useRef();

  const { userSession, setUserSession } = useUserSessionContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = React.useMemo(() => Boolean(anchorEl), [anchorEl]);

  const isAuthenticated = React.useMemo(() => Boolean(userSession.xAuthToken), [
    userSession.xAuthToken,
  ]);

  const userFirstName = React.useMemo(() => {
    try {
      return userSession.displayName.split(' ')[0];
    } catch (error) {
      return 'friend';
    }
  }, [userSession.displayName]);

  const toggleMenu = React.useCallback(() => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(parentEl.current);
  }, [anchorEl, setAnchorEl, parentEl.current]);

  const signOut = React.useCallback(() => {
    setUserSession({ userSession: {} });
    toggleMenu();
    Router.push('/login');
  }, [setUserSession, toggleMenu]);

  return (
    <div ref={parentEl} className={classes.root}>
      {isAuthenticated ? (
        <UserSessionMenu
          anchorEl={anchorEl}
          authToken={userSession.xAuthToken}
          isMenuOpen={isMenuOpen}
          signOut={signOut}
          toggleMenu={toggleMenu}
          userName={userFirstName}
        />
      ) : (
        <Link href="/login">
          <Button
            aria-label="Login Button"
            className={classes.loginButton}
            color="inherit"
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}

export default UserSession;

/**
 * @private Component
 * Renders the user session menu
 */
function UserSessionMenu({
  anchorEl = null,
  authToken = 'fake-token',
  isMenuOpen = false,
  signOut = () => {},
  toggleMenu = () => {},
  userName = 'Unknown',
}) {
  return (
    <React.Fragment>
      <Button
        aria-label="Account of Current User"
        aria-controls="user-session-menu"
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
      >
        <AccountCircle />
        <span style={{ paddingLeft: '8px' }}>Hi, {userName} 👋</span>
      </Button>

      <Menu
        id="user-session-menu"
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
        open={isMenuOpen}
        onClose={toggleMenu}
      >
        <MenuItem onClick={() => console.log('Auth Token', authToken)}>
          Log Token
        </MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
