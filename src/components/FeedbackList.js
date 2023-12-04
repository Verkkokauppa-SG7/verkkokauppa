import React, { useState, useEffect } from 'react';
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

export default FeedbackList;
