import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="left-column">
        <div className="footer-links">
          <p><Link to="/tilaus">Tilaus</Link></p>
          <p><Link to="/toimitus">Toimitus</Link></p>
          <p><Link to="/tietosuoja">Tietosuoja</Link></p>
          <p><Link to="/admin">Admin</Link></p>
        </div>
      </div>
      <p className="copyright">Copyright &copy; TIK23KM Ryhmä 7</p>
      <div className="right-column">
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} className="icon" />
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          <FontAwesomeIcon icon={faTiktok} className="icon" />
        </div>
        <div className="contact">
          <p>Ota yhteyttä:</p>
          <p>info@stiilinsoppi.fi</p>
        </div>
      </div>
    </footer>
  );
}