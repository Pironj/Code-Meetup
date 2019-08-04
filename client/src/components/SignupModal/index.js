import React, { Component } from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import './style.css';
import API from "../../utils/API";
import { setAuthStateLocalStorage } from '../../utils/localStorageHelper';

import { connect } from 'react-redux';
import { setAuthState } from '../../redux/actions';


const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (authState) => {
      dispatch(setAuthState(authState))
    }
  }
}

class SignupModal extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    errors: {},
    show: false
  };
  
  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show: true});

  validateSignup = () => {
    const errors = {};
    if (!this.state.first_name) {
      errors.first_name = "*Please enter your first name.";
    }

    if (typeof this.state.first_name !== "undefined") {
      if (!this.state.first_name.match(/^[a-zA-Z ]*$/)) {
        errors.first_name = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.last_name) {
      errors.last_name = "*Please enter your last name.";
    }

    if (typeof this.state.last_name !== "undefined") {
      if (!this.state.last_name.match(/^[a-zA-Z ]*$/)) {
        errors.last_name = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.email) {
      errors.email = "*Please enter your email.";
    }

    if (typeof this.state.email !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(this.state.email)) {
        errors.email = "*Please enter valid email (example@gmail.com)";
      }
    }

    if (!this.state.password) {
      errors.password = "*Please enter your password.";
    }

    if (typeof this.state.password !== "undefined") {
      if (!this.state.password.match(/^.*(?=.{4,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&]).*$/)) {
        errors.password = "*Password must be at least 4 character at least 1 Cap and lower case letter and contain 1 symbol";
      }
    }
    return errors;
  }

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, prevent the default event
  handleFormSubmitSignup = event => {
    // event.preventDefault();
    // alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    console.log(this.state);
    //create shallow copy of state
    const user = { ...this.state };
    console.log(user);
    // front end validation checking email
    const errors = this.validateSignup()
    if (Object.keys(errors) === errors.first_name || errors.last_name || errors.email || errors.password) {
      this.setState({ errors: errors });
      return console.log(Object.keys(errors));
    }
    this.handleClose();
    // console.log(user);
    user.errors = {}
    this.setState({ first_name: "", last_name: "", email: "", password: "", errors: {} });
    API.authorizeSignup(user)
      .then(res => {
        this.setAuthenticationState(res.data)
      }).catch(err => {
        console.log(err)
      })
  };

  setAuthenticationState = (data) => {
    const authUser = {
      id: data.user._id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      token: data.token
    }
    console.log(authUser)
    setAuthStateLocalStorage(authUser);
    
    // Save auth state in redux store
    this.props.logIn(authUser);
  }

  render() {
    return (
      <>
        <Button id="signup" variant="primary" onClick={ this.handleShow }>
          SignUp
        </Button>
    
        <Modal show={this.state.show} onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>SIGN UP</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form id="register">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChange}
              />
              <div className="errorMsg">{this.state.errors.first_name}</div>
              <br></br>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChange}
              />
              <div className="errorMsg">{this.state.errors.last_name}</div>
              <br></br>
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <div className="errorMsg">{this.state.errors.email}</div>
              <br></br>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <div className="errorMsg">{this.state.errors.password}</div>
              <br></br>
              {/* <Button
                style={{ marginLeft: "3%" }}
                onClick={this.handleFormSubmitSignup}
                >Signup
              </Button> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ this.handleClose }>
              Close
            </Button>
            <Button onClick={ this.handleFormSubmitSignup }>
              SignUp
            </Button>
          </Modal.Footer>
        </Modal>
      </>


    );
  }
}



export default connect(null, mapDispatchToProps)(SignupModal)
