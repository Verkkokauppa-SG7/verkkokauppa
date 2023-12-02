// PresetCategories.js
import React from 'react';
import { Link } from 'react-router-dom';


const CategoryForm = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin/tuoteryhmat">Tuoteryhmien ylläpito</Link></li>
      </ul>
    </nav>
  );
};

export default CategoryForm;