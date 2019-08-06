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
import { Row, Col } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { getFullAuthenticationState, getAuthState } from '../../utils/localStorageHelper'
import LogoutButton from '../LogoutButton';
import './style.css';

import { connect } from 'react-redux';
import { deleteAuthState } from '../../redux/actions';

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


  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (

    <div className={classes.root}>
      <FormGroup>
        <Row>
          <Col md={4}>
            <div id="buttonDiv">
              {
                props.first_name ? <LogoutButton /> : <span><LoginModal /><SignupModal /></span>
              }
            </div>
          </Col>
          <Col md={{ span: 3, offset: 5 }}>
            <div id="user">
              {
                props.first_name ? "Logged in as: " + props.first_name : ''
              }
            </div>
          </Col>
        </Row>
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
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
                {
                  props.first_name ?
                    <div>
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
                    </div>
                    :
                    <Link
                      style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "black" }}
                      to="/events"
                      onClick={handleClose}>
                      Events
                  </Link>
                }
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar)
