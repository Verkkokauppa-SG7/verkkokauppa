// PresetCategories.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PresetCategories.css'

const PresetCategories = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/miehet">Miehet</Link></li>
        <li><Link to="/naiset">Naiset</Link></li>
        <li><Link to="/unisex">Unisex</Link></li>
      </ul>
    </nav>
  );
};

export default PresetCategories;