// AdminLogin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/FeedbackList.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Set to true if the login is successful

  useEffect(() => {
    console.log({ isAdmin });
  }, [isAdmin]); // This useEffect will run whenever isAdmin changes

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    console.log('handleLogin called');
    try {
      const response = await axios.post('http://localhost:3001/adminlogin', {
        username: username,
        pw: password,
      });

      
      const { jwtToken } = response.data;

      // Set the isAdmin true with successful login
      setIsAdmin(true);

      // Redirect to another component after successful login
      navigate('/yllapito');
     
      console.log({isAdmin});

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
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Käyttäjätunnus:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Salasana:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Kirjaudu</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="empty-space"></div>
    </div>
    
  );
}

export default AdminLogin;