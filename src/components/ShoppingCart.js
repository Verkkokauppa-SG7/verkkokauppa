import React from "react";
import '../styles/ShoppingCart.css'
import { cartSignal } from "./signals";
import { Card } from "react-bootstrap";

const ShoppingCart = (addToCart) => {

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

  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return (
      <div>
        <h3>Ostoskorisi on tyhjä</h3>
      </div>
    );
  }

  return (
    <div>
      {cartProducts.map((p) => (
        <Card key={p.id}>
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
      <div>
        <button onClick={() => cartSignal.value = []}>Tyhjennä ostoskori</button>
      </div>
    </div>
  );
}