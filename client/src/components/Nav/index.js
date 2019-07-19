import React from 'react';
import "./nav.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>
      <ul>
        <li><a className="google-btn" href="/auth/google">Google+</a></li>
        <li><a href="/auth/logout">Logout</a></li>
        <li><a href="/auth/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
