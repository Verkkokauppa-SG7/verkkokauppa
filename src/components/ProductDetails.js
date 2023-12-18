import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductDetails.css'
import { cartSignal } from './signals';
import Review from './Review';
import ReviewsList from './ReviewsList';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);


  useEffect(() => {
    // Tee tarvittava tietokantahaku tuotteen tietojen noutamiseksi
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/product/${productId}`);
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

  const imagePath = process.env.PUBLIC_URL + '/images/' + product.image_url;

  function handleAddToCart(p) {
    //tuotteen lisääminen ostoskoriin toiminto tähän
    if (cartSignal.value) {
      const prod = cartSignal.value.find((prod) => prod.id === p.id)

      if (prod) {
        prod.quantity++
        cartSignal.value = [...cartSignal.value]
      } else {
        cartSignal.value = [...cartSignal.value, { ...p, quantity: 1 }]
      }
    } else {
      // Jos cartSignal.value on undefined, aseta se tyhjäksi taulukoksi ja lisää tuote
      cartSignal.value = [{ ...p, quantity: 1 }]
    }

    // Aseta tila, että tuote on lisätty ostoskoriin
    setAddedToCart(true);

    // Nollaa tila ilmoituksen piilottamiseksi 4 sekunnin kuluttua
    setTimeout(() => {
      setAddedToCart(false);
    }, 4000);
  }

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img src={imagePath} alt="Tuotekuva" />
      </div>
      <div className="product-info-container">
        <h2>{product.product_name}</h2>
        <p>{product.product_description}</p>
        <p>Hinta: {product.price}</p>
        {/* Muut tuotetiedot */}
        <button onClick={() => handleAddToCart(product)}>Lisää ostoskoriin</button>
        {addedToCart && (
          <div className="alert alert-success mt-2" role="alert">
            Tuote lisätty ostoskoriin!
          </div>
        )}
      </div>
      <div className="product-reviews-container">
        <Review productId={product.id} />
        <ReviewsList productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetails;
