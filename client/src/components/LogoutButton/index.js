import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css';

import {connect} from 'react-redux';
import {deleteAuthState} from '../../redux/actions';

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


function LogoutButton(props) {

  function handleChange(event) {
    console.log("logout clicked")
      localStorage.removeItem('authUser');
      props.logOut();

  }



  return (
    <Button id="logout" onClick={handleChange}>Logout</Button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);