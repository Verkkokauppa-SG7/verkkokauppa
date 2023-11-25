// PresetCategories.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PresetCategories.css'

const PresetCategories = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/tuoteryhmät/miehet">Miehet</Link></li>
        <li><Link to="/tuoteryhmät/naiset">Naiset</Link></li>
        <li><Link to="/tuoteryhmät/unisex">Unisex</Link></li>
      </ul>
    </nav>
  );
};

export default PresetCategories;