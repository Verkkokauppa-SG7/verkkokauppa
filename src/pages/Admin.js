// Admin.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Admin = ({isAdmin}) => { 
  console.log({isAdmin});
  return (
    <div>
    {isAdmin && <Navbar />}
    <nav>
      <ul>
        <li><Link to="/yllapito/tuoteryhmat">Tuoteryhmien ylläpito</Link></li>
      </ul>
    </nav>
    </div>
  );
};

export default Admin;