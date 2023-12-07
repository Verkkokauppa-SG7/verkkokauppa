import React from "react";
import '../styles/ShoppingCart.css'
import { cartSignal } from "./signals";
import { Card } from "react-bootstrap";

const ShoppingCart = () => {

  return (
    <div>
      <h1>Ostoskori</h1>
      <CartContents />
    </div>
  );
};

export default ShoppingCart;

// Komponentti, joka näyttää ostoskorin sisällön
function CartContents() {

  // Haetaan ostoskorin tuotteet cartSignalista tai käytetään tyhjää taulukkoa
  const cartProducts = cartSignal.value || []

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, p) => total + (p.count * p.price), 0).toFixed(2);
  };

  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return (
      <div>
        <h3>Ostoskorisi on tyhjä</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="cart-items">
        {cartProducts.map((p) => (
          <Card key={p.id} className="cart-item">
            <Card.Body>
              <Card.Title>{p.product_name}</Card.Title>
              <Card.Text>
                Määrä: {p.count}
              </Card.Text>
              <Card.Text>
                Hinta: {p.price}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="cart-summary">
        <button className="custom-button" onClick={() => cartSignal.value = []}>Tyhjennä ostoskori</button>
        <h4 className="total-price">Tilaus yhteensä: {calculateTotalPrice()} €</h4>
      </div>
    </div>
  );
}