import React from 'react';
import './FrontPage.css';
import image1 from '../images/etusivu-kuva1.jpg';
import image2 from '../images/etusivu-kuva2.jpg';
import image3 from '../images/etusivu-kuva3.jpg';
import image4 from '../images/etusivu-kuva4.jpg';

export default function FrontPage() {
  return (
    <main className="content">
      <div class="row">
        <div class="column" className="frontText">
          <h2>Miesten<br></br>Naisten<br></br>Unisex<br></br>Muoti</h2>
          <br></br>
          <br></br>
          <button type="button">Ostoksille</button>
        </div>
        <div class="column" className="frontImage">
          <img src={image1} className="img1" alt="Man with tie" />
        </div>
      </div>
      <div class="row" className="galleryBox">
          <img src={image2} className="img2" alt="Woman sitting on chair"/>
          <img src={image3} className="img3" alt="Dancing man"/>
          <img src={image4} className="img4" alt="Black corset top and suit"/>
      </div>
    </main>
  )
}
