// import React from 'react';


import React, { Component } from "react";
import './style.css';
import API from "../../utils/API";

class RegisterForm extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

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
    this.setState({ first_name: "", last_name: "", email: "", password: "" });
    console.log(this.state);
    const user = this.state;
    // TODO return API call to server to validate user
    return API.authorizeSignup(user);
  };
  // When the form is submitted, prevent the default event
  handleFormSubmitLogin = event => {
    event.preventDefault();
    // alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    this.setState({email: "", password: "" });
    console.log(this.state);
    const loginUserObj = {
      email: this.state.email,
      password: this.state.password
    }
    const user = loginUserObj;
    // TODO return API call to server to validate user
    return API.authorizeLogin(user);
  };

  render() {
    return (
      <form id="register">
        {/* <p>Username: {this.state.username}</p>
        <p>Password: {this.state.password}</p> */}
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={this.state.first_name}
          onChange={this.handleInputChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={this.state.last_name}
          onChange={this.handleInputChange}
        />
        <br></br>
        <input
          type="email"
          placeholder="name@example.com"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <br></br>
        <button onClick={this.handleFormSubmitLogin}>Login</button>
        <button onClick={this.handleFormSubmitSignup}>Signup</button>
      </form>
    );
  }
}

export default RegisterForm;


















// class RegisterForm extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         fields: {},
//         errors: {}
//       }

//       this.handleChange = this.handleChange.bind(this);
//       this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

//     };

//     handleChange(e) {
//       let fields = this.state.fields;
//       fields[e.target.name] = e.target.value;
//       this.setState({
//         fields
//       });

//     }

//     submituserRegistrationForm(e) {
//       e.preventDefault();
//       if (this.validateForm()) {
//           let fields = {};
//           fields["firstName"] = "";
//           fields["lastName"] = "";
//           fields["emailid"] = "";
//           fields["password"] = "";
//           this.setState({fields:fields});
//           alert("Form submitted");
//         // TODO send user to signup form
//       }

//     }

//     validateForm() {

//       let fields = this.state.fields;
//       let errors = {};
//       let formIsValid = true;

//       if (!fields["firstName"]) {
//         formIsValid = false;
//         errors["firstName"] = "*Please enter your first name.";
//       }

//       if (typeof fields["firstName"] !== "undefined") {
//         if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
//           formIsValid = false;
//           errors["firstName"] = "*Please enter alphabet characters only.";
//         }
//       }

//       if (!fields["lastName"]) {
//         formIsValid = false;
//         errors["lastName"] = "*Please enter your last name.";
//       }

//       if (typeof fields["lastName"] !== "undefined") {
//         if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
//           formIsValid = false;
//           errors["lastName"] = "*Please enter alphabet characters only.";
//         }
//       }

//       if (!fields["emailid"]) {
//         formIsValid = false;
//         errors["emailid"] = "*Please enter your email.";
//       }

//       if (typeof fields["emailid"] !== "undefined") {
//         //regular expression for email validation
//         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//         if (!pattern.test(fields["emailid"])) {
//           formIsValid = false;
//           errors["emailid"] = "*Please enter valid email-ID.";
//         }
//       }

//       if (!fields["password"]) {
//         formIsValid = false;
//         errors["password"] = "*Please enter your password.";
//       }

//       if (typeof fields["password"] !== "undefined") {
//         if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
//           formIsValid = false;
//           errors["password"] = "*Please enter secure and strong password.";
//         }
//       }

//       this.setState({
//         errors: errors
//       });
//       return formIsValid;


//     }



//   render() {
//     return (
//     <div id="main-registration-container">
//      <div id="register">
//         <h3>Registration page</h3>
//         <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
//         <label>First Name</label>
//         <input type="text" name="firstName" value={this.state.fields.firstName} onChange={this.handleChange} />
//         <div className="errorMsg">{this.state.errors.firstName}</div>
//         <label>Last Name</label>
//         <input type="text" name="lastName" value={this.state.fields.lastName} onChange={this.handleChange} />
//         <div className="errorMsg">{this.state.errors.lastName}</div>
//         <label>Email ID:</label>
//         <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
//         <div className="errorMsg">{this.state.errors.emailid}</div>
//         <label>Password</label>
//         <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
//         <div className="errorMsg">{this.state.errors.password}</div>
//         <input type="submit" className="button"  value="Register"/>
//         </form>
//     </div>
// </div>

//       );
//   }


// }


// export default RegisterForm;