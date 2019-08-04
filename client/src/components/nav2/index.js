import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { NavDropdown } from 'react-bootstrap';
import { getFullAuthenticationState, getAuthState } from '../../utils/localStorageHelper'
import LogoutButton from '../LogoutButton';

import {connect} from 'react-redux';
import {deleteAuthState} from '../../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
    token: state.authState.token,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(deleteAuthState())
    }
  }
}


const MenuAppBar = (props) => {

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleChange(event) {
    
    event.localStorage.removeItem('authUser');
    props.logOut();
    // console.log(event.target.checked);
    // setAuth(event.target.checked)
    // if (event.target.checked === false) {
    // }

  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      (Temporary for testing) Logged in as: {
        props.first_name ? props.first_name :  'Not logged in'
      }
      <FormGroup>
        <span>
          {/* <FormControlLabel
            control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
            label={auth ? 'Login' : 'Logout'}
          /> */}
          <LogoutButton onClick={handleChange} />
          <LoginModal />
          <SignupModal />
        </span>
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: "White", textDecoration: 'none' }} >
              <div>
                <span>&#60;</span>
                rendezvous
            <span> &#8725;</span>
                <span>&#62;</span>
              </div>
            </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
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
                <Link
                  style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "black" }}
                  to={`/users/${props.id}`}
                  onClick={handleClose}>
                  Profile
                </Link>
                <br></br>
                <Link
                  style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "black" }}
                  to="/events"
                  onClick={handleClose}>
                  Events
                </Link>
                <br></br>
                <Link
                  style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "black" }}
                  to="/create-event"
                  onClick={handleClose}>
                  Create Event
                </Link>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar)