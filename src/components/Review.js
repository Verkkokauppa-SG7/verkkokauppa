import React, { useState } from 'react';
import axios from 'axios';

const Review = ({ productId }) => {
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    // Funktio arvostelun lähettämiseksi
    const submitReview = async () => {

        // Tarkistetaan, ovatko kaikki tiedot täytetty
        if (!name || !rating || !comment) {
            setError('Kaikki tiedot ovat pakollisia.')
            return
        }

        try {
            // Lähetetään arvostelu palvelimelle
            await axios.post('http://localhost:3001/reviews/', { name, productId, rating, comment })
        } catch (error) {
            console.error('Virhe arvostelun lisäämisessä:', error.message)
        }
    }

    return (
        <div className="container mt-4">
            <h2>Anna arvostelu tuotteesta</h2>
            <div className="mb-3">
                <label className="form-label">Nimi:</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Arvosana (1-5):</label>
                <input type="number" min="0" max="5" className="form-control" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Kommentti:</label>
                <textarea className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button className="btn btn-default" onClick={submitReview}>Lisää arvostelu</button>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    )
}

export default Review;