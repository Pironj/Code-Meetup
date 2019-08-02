// import React from 'react';


import React, { Component } from "react";
import {Form, Button} from 'react-bootstrap';
import './style.css';
import API from "../../utils/API";


import {connect} from 'react-redux';
import {setAuthState} from '../../learnredux/actions';

// const mapStateToProps = (state) => {
//   return {
//     id: state.authState.id,
//     first_name: state.authState.first_name,
//     last_name: state.authState.last_name,
//     email: state.authState.email,
//     token: state.authState.token,
//   };
// }

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (authState) => {
      dispatch(setAuthState(authState))
    }
  }
}

class RegisterForm extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    errors: {}
  };
  
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
  
  // When the form is submitted, prevent the default event
  handleFormSubmitSignup = event => {
    event.preventDefault();
    // alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    console.log(this.state);
    //create shallow copy of state
    const user = {...this.state};
    console.log(user);
    // front end validation checking email
    const errors = this.validateSignup()
    if(Object.keys(errors) === errors.first_name || errors.last_name || errors.email || errors.password) {
      this.setState({errors: errors});
      return console.log(Object.keys(errors));
    }

    console.log(user);
    user.errors = {}
    this.setState({ first_name: "", last_name: "", email: "", password: "", errors: {}});
    return API.authorizeSignup(user)
    .then(res => {
      let authUser = JSON.stringify({ id: res.data.user._id, first_name: res.data.user.first_name, last_name: res.data.user.last_name, email: res.data.user.email, token: res.data.token });
      console.log("========= RESPONSE ========\n", authUser);
      localStorage.setItem('authUser', authUser);
      return ; // unable to get props here to call logIn to render state
    })
    
  
  };
  // When the form is submitted, prevent the default event
  
  handleFormSubmitLogin = event => {
    event.preventDefault()
    this.setState({email: "", password: "" });
    console.log(this.state);
    const loginUserObj = {
      email: this.state.email,
      password: this.state.password
    }
    const user = loginUserObj;
    return API.authorizeLogin(user)
    .then(res => {
      let authUser = JSON.stringify({ id: res.data.user._id, first_name: res.data.user.first_name, last_name: res.data.user.last_name, email: res.data.user.email, token: res.data.token });
      console.log("========= RESPONSE ========\n", authUser);
      localStorage.setItem('authUser', authUser);
      return ; // unable to get props here to call logIn to render state
    })
  }

  render() {
    return (
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
        <Button onClick={this.handleFormSubmitLogin}>Login</Button>
        <Button 
          style={{marginLeft: "3%"}} 
          onClick={this.handleFormSubmitSignup}
        >Signup
        </Button>
      </Form>
    );
  }
}



export default connect(null, mapDispatchToProps)(RegisterForm)
