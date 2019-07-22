import React from 'react';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
// import Login from '..//googleLogin';
// import Logout from '..//googleLogout';

function Navigation() {
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
            <Nav.Link href="#home">Home</Nav.Link>
            {/* <Login />
            <Logout /> */}
            {/* <Nav.Link href="http://localhost:4500/auth">Login/Sign up</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link> */}
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Events</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Create Event</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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
