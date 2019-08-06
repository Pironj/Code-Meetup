import React, { Component } from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import './style.css';
import API from "../../utils/API";
import { setAuthStateLocalStorage } from '../../utils/localStorageHelper';

import { connect } from 'react-redux';
import { setAuthState } from '../../redux/actions';
import { STATUS_CODES } from 'http';

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (authState) => {
      dispatch(setAuthState(authState))
    }
  }
}


class LoginModal extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    errors: {},
    show: false
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  validateLogin = () => {
    const errors = {};
    if (STATUS_CODES) {
      errors.user = "*Either your email or password is incorrect.";
      console.log(errors.user);
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

  // const [validated, setValidated] = useState(false);
  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  handleFormSubmitLogin = event => {

    //create shallow copy of state
    const userCopy = { ...this.state };
    const loginUserObj = {
      email: userCopy.email,
      password: userCopy.password
    }
    // front end validation checking email
    const errors = this.validateLogin()
    if (Object.keys(errors) === errors.first_name || errors.last_name || errors.email || errors.password) {
      this.setState({ errors: errors });
      return console.log(Object.keys(errors));
    }
    this.setState({ email: "", password: "" });
    const user = loginUserObj;
    API.authorizeLogin(user)
      .then(res => {
        this.setState({ errors: {} })
        this.setAuthenticationState(res.data)
        this.handleClose();
      })
      .catch(err => {
        const errors = this.validateLogin()
        if (Object.keys(errors) === errors.user) {
          this.setState({ errors: errors });
          return console.log(Object.keys(errors));
        }

      })
  }

  setAuthenticationState = (data) => {
    const authUser = {
      id: data.user._id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      token: data.token
    }
    setAuthStateLocalStorage(authUser);

    // Save auth state in redux store
    this.props.logIn(authUser);
  }

  render() {
    return (
      <>
        <Button id="loginBtn" variant="primary" onClick={this.handleShow}>
          Login
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              LOG IN
              <br></br>
              <div className="errorMsg">{this.state.errors.user}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form id="register">
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button onClick={this.handleFormSubmitLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>


    );
  }
}



export default connect(null, mapDispatchToProps)(LoginModal)
