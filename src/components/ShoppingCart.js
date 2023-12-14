import React from "react";
import '../styles/ShoppingCart.css'
import { cartSignal } from "./signals";
import { Card } from "react-bootstrap";
import OrderButton from "./OrderButton";

const ShoppingCart = () => {
  const cartProductCount = cartSignal.value ? cartSignal.value.length : 0;

  return (
    <div>
      <h1>Ostoskori</h1>
      <p>Ostoskorissa on {cartProductCount} tuotetta.</p>
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
    return cartProducts.reduce((total, p) => total + (p.quantity * p.price), 0).toFixed(2)
  }

  // Lasketaan kunkin tuotteen yhteyshinta
  const calculateProductTotal = (p) => {
    return (p.quantity * p.price).toFixed(2)
  }

  // Vähennetään tai lisätään ostoskorissa olevien tuotteiden määrää
  const handleIncrement = (productId) => {
    const updatedCart = cartProducts.map((p) =>
      p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
    )
    cartSignal.value = updatedCart
  }

  const handleDecrement = (productId) => {
    const updatedCart = cartProducts.map((p) =>
      p.id === productId ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : 0 } : p
    )
    const filteredCart = updatedCart.filter((p) => p.quantity > 0)
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
                  {p.product_description}
                </Card.Text>
                <Card.Text>
                  <button className="decrement-button" onClick={() => handleDecrement(p.id)}>-</button>
                  <span> {p.quantity} </span>
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