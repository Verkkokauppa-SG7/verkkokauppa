import React from "react";
import '../styles/ShoppingCart.css'
import { cartSignal } from "./signals";
import { Card } from "react-bootstrap";
import OrderButton from "./OrderButton";

const ShoppingCart = () => {

  return (
    <div>
      <h1>Ostoskori</h1>
      <CartContents />
      <OrderButton />
    </div>
  )
}

export default ShoppingCart;

// Komponentti, joka näyttää ostoskorin sisällön
function CartContents() {

  // Haetaan ostoskorin tuotteet cartSignalista tai käytetään tyhjää taulukkoa
  const cartProducts = cartSignal.value || []

  // Lasketaan ostoskorin yhteyshinta
  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, p) => total + (p.count * p.price), 0).toFixed(2)
  }

  // Lasketaan kunkin tuotteen yhteyshinta
  const calculateProductTotal = (p) => {
    return (p.count * p.price).toFixed(2)
  }

  // Vähennetään tai lisätään ostoskorissa olevien tuotteiden määrää
  const handleIncrement = (productId) => {
    const updatedCart = cartProducts.map((p) =>
      p.id === productId ? { ...p, count: p.count + 1 } : p
    )
    cartSignal.value = updatedCart
  }

  const handleDecrement = (productId) => {
    const updatedCart = cartProducts.map((p) =>
      p.id === productId ? { ...p, count: p.count > 1 ? p.count - 1 : 0 } : p
    )
    const filteredCart = updatedCart.filter((p) => p.count > 0)
    cartSignal.value = filteredCart
  }

  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return (
      <div>
        <h3>Ostoskorisi on tyhjä</h3>
      </div>
    )
  }

  return (
    <div>
      <div className="cart-items">
        {cartProducts.map((p) => (
          <Card key={p.id} className="cart-item">
            <Card.Body className="cart-item-body">
              <img src={process.env.PUBLIC_URL + '/images/' + p.image_url} alt={p.product_name} className="cart-image" />
              <div className="cart-item-details">
                <Card.Title>{p.product_name}</Card.Title>
                <Card.Text>
                  <p>{p.product_description}</p>
                </Card.Text>
                <Card.Text>
                  <button className="decrement-button" onClick={() => handleDecrement(p.id)}>-</button>
                  <span> {p.count} </span>
                  <button className="increment-button" onClick={() => handleIncrement(p.id)}>+</button>
                </Card.Text>
              </div>
              <div className="price">
                <Card.Text>
                  {calculateProductTotal(p)} €
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="cart-summary">
        <button className="custom-button" onClick={() => (cartSignal.value = [])}>Tyhjennä ostoskori</button>
        <h4 className="total-price">Tilaus yhteensä: {calculateTotalPrice()} €</h4>
      </div>
    </div>
  )
}