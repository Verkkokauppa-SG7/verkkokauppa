import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './ProductDetails.css'

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tee tarvittava tietokantahaku tuotteen tietojen noutamiseksi
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${productId}`);
        const productData = await response.json();
        setProduct(productData);

        console.log(productData)
        setLoading(false);

      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    // Latausindikaattori näytetään, kun hakutuloksia haetaan
    return (
      <div className="loading-spinner">
        <FontAwesomeIcon icon={faSpinner} spin />
        <span>Loading...</span>
      </div>
    );
  }

  if (!product) {
    return <div>Tuotesivu ei saatavilla.</div>;
  }

  const handleAddToCart = () => {
  //tuotteen lisääminen ostoskoriin toiminto tähän
    console.log('Lisätty ostoskoriin:', product);
  };

  return (
    <div>
      <h2>{product.productName}</h2>
      <p>{product.description}</p>
      <p>Hinta: {product.price}</p>
      {/* Muut tuotetiedot */}
      <button onClick={handleAddToCart}>Lisää ostoskoriin</button>
    </div>
  );
};

export default ProductDetails;
