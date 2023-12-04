import React, { useState } from 'react';
import '../styles/FeedbackList.css'

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  // Objekti, joka sisältää lomakkeen tiedot
  const formData = {
    name,
    email,
    message,
  };

  try {
    // Lähetetään POST-pyyntö palvelimelle
    const response = await fetch('http://localhost:3001/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Tarkista vastaus ja tee tarvittavat toimenpiteet
    if (response.ok) {
      console.log('Lomake lähetetty onnistuneesti');
      setThankYouMessage('Kiitos palautteesta!');
      // Viesti onnistuneen lähetyksen jälkeen
    } else {
      console.error('Lomakkeen lähetyksessä tapahtui virhe');
      // Virheen käsittely
    }
  } catch (error) {
    console.error('Virhe lomakkeen lähetyksessä:', error);
  }
};

const handleReturnHome = () => {
    // Palaa etusivulle napin toiminnallisuudet
    window.location.replace('http://localhost:3000/');
  };

  return (
    <div>
    {thankYouMessage ? (
      <div>
        <p>{thankYouMessage}</p>
        <button onClick={handleReturnHome}>Palaa etusivulle</button>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nimi:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div>
          <label>
            Sähköposti:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
        </div>
        <label>
          Viesti:
          <textarea
            value={message}
            onChange={handleMessageChange}
            style={{ width: '200%', height: '150px' }}
          />
        </label>
        <div>
          <button type="submit">Lähetä</button>
        </div>
      </form>
    )}
    <div className="empty-space"></div>
  </div>
);
};



export default ContactForm;