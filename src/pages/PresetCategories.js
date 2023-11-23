// PresetCategories.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PresetCategories.css'

const PresetCategories = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/tuotteet/miehet">Miehet</Link></li>
        <li><Link to="/tuotteet/naiset">Naiset</Link></li>
        <li><Link to="/tuotteet/unisex">Unisex</Link></li>
      </ul>
    </nav>
  );
};

export default PresetCategories;