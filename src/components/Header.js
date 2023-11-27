import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="heading">
        <h1>Stiilin soppi</h1>
      </div>
      <div className="icons">
        <Link to="/ostoskori" className="link-icon"><FontAwesomeIcon icon={faCartShopping}/></Link>
      </div>
    </header>
  );
}

