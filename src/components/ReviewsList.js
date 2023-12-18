import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Haetaan arvostelut palvelimelta
        const response = await axios.get(`http://localhost:3001/reviews/${productId}`)
        // Päivitetään tila arvosteluilla
        setReviews(response.data.reviews)
      } catch (error) {
        console.error('Virhe arvostelujen hakemisessa:', error.message)
      }
    }

    fetchReviews()
  }, [productId])

  return (
    <div>
      <h2>Arvostelut</h2>
      {reviews.map((review) => (
        <div key={review.id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">Nimi: {review.name}</p>
            <p className="card-text">Arvosana: {review.rating}</p>
            <p className="card-text">Kommentti: {review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewsList;