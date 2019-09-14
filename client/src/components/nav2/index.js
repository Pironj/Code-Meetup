import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormGroup from '@material-ui/core/FormGroup';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { Row } from 'react-bootstrap';

import LogoutButton from '../LogoutButton';
import './style.css';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => (
  {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
  };
}

const MenuAppBar = (props) => {

  const classes = useStyles();
  const [auth,
    // setAuth
  ] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (

    <div id="navDiv" className={classes.root}>
      <FormGroup>
        <Row>
          <div id="user">
            {
              props.first_name ? "LOGGED IN AS: " + props.first_name : ''
            }
          </div>
        </Row>
      </FormGroup>

      <AppBar style={{backgroundColor: 'white'}} position="sticky">

        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: "White", textDecoration: 'none' }} >
              <div id="title-font">
                HOME
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
                <MenuIcon
                style={{color: 'black'}}
                 />
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
                    <div id="links">
                      <Link
                        className="links"
                        style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "white" }}
                        to={`/users/${props.id}`}
                        onClick={handleClose}>
                        PROFILE
                      </Link>
                      <br></br>

                      <Link
                        className="links"
                        style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "white" }}
                        to="/events"
                        onClick={handleClose}>
                        EVENTS
                      </Link>
                      <br></br>

                      <Link
                        className="links"
                        style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "white" }}
                        to="/create-event"
                        onClick={handleClose}>
                        CREATE EVENT
                      </Link>
                      <br></br>
                      <LogoutButton />
                    </div>
                    :
                    <div>
                      <Link
                        className="links"
                        style={{ marginLeft: ".5rem", paddingRight: '3rem', color: "white" }}
                        to="/events"
                        onClick={handleClose}>
                        EVENTS
                      </Link>

                      <br></br>
                      <LoginModal />
                      <br></br>
                      <SignupModal />

                    </div>
                }
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(mapStateToProps)(MenuAppBar)
