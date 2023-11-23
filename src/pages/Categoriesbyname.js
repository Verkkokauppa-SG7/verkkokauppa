// PresetCategories.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PresetCategories.css'

const Categoriesbyname = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/vaatteet/miehet">Miehet</Link></li>
        <li><Link to="/vaatteet/naiset">Naiset</Link></li>
        <li><Link to="/vaatteet/unisex">Unisex</Link></li>
      </ul>
    </nav>
  );
};

export default Categoriesbyname;