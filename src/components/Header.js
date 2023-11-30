import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import SearchBar from './SearchBar.js';

const Header = () => {

  return (
    <header className="header">
      <div className="left-section"></div>
      <div className="center-section">
        <h1>Stiilin soppi</h1>
      </div>
      <div className="right-section">
        <div className="icons">
          <SearchBar />
          <Link to="/ostoskori" className="link-icon"><FontAwesomeIcon icon={faCartShopping} /></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

