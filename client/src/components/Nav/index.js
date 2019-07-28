import React from 'react';
import './style.css';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Login from '..//googleLogin';
import API from '../../utils/API';

function Navigation(props) {

  const linkResponse = async () => {
    return await API.protectedRoute();
  }


  return (
    <div>
      <Navbar bg="info" expand="lg">
        <Link style={{ marginLeft: ".5rem", color: "black" }} to={'/'}>
          <Navbar.Brand>
            <span>&#60;</span>
            rendezvous
            <span> &#8725;</span>
            <span>&#62;</span>
          </Navbar.Brand>
        </Link>
        <Link style={{ marginLeft: ".5rem", color: "black" }} to={'/tempmap'}>
          <Navbar.Brand>
            Map
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link style={{ marginLeft: ".5rem", color: "black" }} to={'/'}>Home</Link>
            <Login />
            <NavDropdown title="More" id="basic-nav-dropdown">
              <Link style={{ marginLeft: ".5rem", color: "black" }} className="navLink" to="/" onClick={linkResponse}>Test Route</Link>
              <br></br>
              <Link style={{ marginLeft: ".5rem", color: "black" }} className="navLink" to={`/userProfile/${props.id}`}>Profile</Link>
              <br></br>
              <Link style={{ marginLeft: ".5rem", color: "black" }} className="navLink" to="/event">Events</Link>
              <br></br>
              <Link style={{ marginLeft: ".5rem", color: "black" }} className="navLink" to="/createEvent">Create Event</Link>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
