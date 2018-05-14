import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Pericoresi</h1>
      <div className="header-inner">
          <div className="wrapper">
          <div className="nav-container">
              <Link to="/">Home</Link>
          </div>
          <div className="nav-container">
              <Link to="/userinfo">User Info</Link>
          </div>
          <div className="nav-container">
              <Link to="/login">Login</Link>
          </div>
          </div>
      </div>
    </header>
)};

export default Header;
