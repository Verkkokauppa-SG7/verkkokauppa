// Lisää tarvittavat import-lauseet
import React, { useState, useEffect } from 'react';
import '../styles/FeedbackList.css'

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/feedback')
      .then(response => response.json())
      .then(data => {
        setFeedback(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Haluatko varmasti poistaa tämän asiakaspalautteen?");
    
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/feedback/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Poisto onnistui, päivitä tila uuden palautelistauksen kanssa
          const updatedFeedback = feedback.filter(item => item.id !== id);
          setFeedback(updatedFeedback);
        } else {
          console.error('Error deleting feedback:', response.status);
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  if (loading) {
    return <p>Ladataan...</p>;
  }

  return (
    <div>
      <h2>Asiakaspalaute</h2>
      <ul>
        {feedback.map(item => (
          <li key={item.id}>
            <div className="feedback">
            <p>Nimi: {item.name}</p>
            <p>Sähköposti: {item.email}</p>
            <p>Viesti: {item.message}</p>
            <button className="poistanappi" onClick={() => handleDelete(item.id)}>Poista</button>
            <hr />
            </div>
          </li>
        ))}
      </ul>
      <div className="empty-space"></div>
    </div>
  );
};

export default FeedbackList;



/*import React, { useState, useEffect } from 'react';
import '../styles/FeedbackList.css'

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Haetaan asiakaspalaute palvelimelta
    fetch('http://localhost:3001/feedback')
      .then(response => response.json())
      .then(data => {
        setFeedback(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Ladataan...</p>;
  }

  return (
    <div>
      <h2>Asiakaspalaute</h2>
      <ul>
        {feedback.map(item => (
          <li key={item.id}>
            <p>Nimi: {item.name}</p>
            <p>Sähköposti: {item.email}</p>
            <p>Viesti: {item.message}</p>
            <hr />
          </li>
        ))}
      </ul>
      <div className="empty-space"></div>
    </div>

  );
};

export default FeedbackList; */
