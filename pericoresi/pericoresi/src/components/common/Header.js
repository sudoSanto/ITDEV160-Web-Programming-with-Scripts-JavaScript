import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

const Header = () => {
  return (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
    <nav>
      <Link to="/">Home</Link>
      {' | '}
      <Link to="/about">About</Link>
    </nav>
  </header>
)};

export default Header;
