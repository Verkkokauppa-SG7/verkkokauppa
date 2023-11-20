import React from 'react';
import './FrontPage.css';
import image from '../images/etusivu-frontkuva.jpg';

export default function FrontPage() {
  return (
    <main className="content">
    <div className="frontText">
        <h2>Miesten<br></br>Naisten<br></br>Muoti</h2>
        <br></br>
        <br></br>
        <button type="button">Ostoksille</button>
    </div>
    <div className="frontImage">
        <img src={image} className="img1" alt="Man with tie" />
    </div>
    </main>
  )
}
