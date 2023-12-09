// AdminLogin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Adminlogin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Set to true if the login is successful

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    console.log('handleLogin called');
    try {
      const response = await axios.post('http://localhost:3001/adminlogin', {
        username: username,
        pw: password,
      });

      
      const { jwtToken } = response.data;

      
      // Set the isAdmin state
      setIsAdmin(true);
      console.log(isAdmin);

      console.log('handleLogin over');

      // Redirect to Admin-page after successful login
      navigate('/yllapito');
     

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Virhe sisäänkirjautumisessa. Yritä uudelleen.');
      }
    }
  };

  console.log('Component rendering with isAdmin:', isAdmin);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className='bg-white p-3 rounded w-25'>
      <form className="adminloginform" onSubmit={handleLogin}>
        <label>
          Käyttäjätunnus:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Salasana:
        <br></br>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='adminlogin' type="submit">Kirjaudu</button>
      </form>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <div className="empty-space"></div>
    </div>
    
  );
}

export default AdminLogin;