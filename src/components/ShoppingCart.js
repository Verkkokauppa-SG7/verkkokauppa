import React from "react";
import '../styles/ShoppingCart.css'
import { cartSignal } from "./signals";
import handleAddToCart from "./ProductDetails"
import ProductDetails from "./ProductDetails";
import CartContents from "./ProductDetails"


const ShoppingCart = () => {
    return (
      <div>
        <h1>Ostoskori</h1>
      </div>
    );
  };

export default ShoppingCart;