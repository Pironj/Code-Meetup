import React from 'react';
import './style.css';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import Login from '..//googleLogin';

function Navigation(props) {
  return (
    <div>
          <Navbar bg="info" expand="lg">
        <Navbar.Brand href="#home">
            <span>&#60;</span>
            rendezvous 
            <span>&#8725;</span>
            <span>&#62;</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Login />
            <NavDropdown title="More" id="basic-nav-dropdown">
              <Link style={{marginLeft: ".5rem", color: "black"}} className="navLink" to={`/userProfile/${props.id}`}>Profile</Link>
              <br></br>
              <Link style={{marginLeft: ".5rem", color: "black"}} className="navLink" to="/event">Events</Link>
              <br></br>
              <Link style={{marginLeft: ".5rem", color: "black"}} className="navLink" to="/createEvent">Create Event</Link>
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
