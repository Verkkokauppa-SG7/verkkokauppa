import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductDetails.css'
import { cartSignal } from './signals';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


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

  function CartContents(){

    const cartProducts = cartSignal.value

    return(
        <div>
            <h2>Ostoskori</h2>
            <ul>
                {cartProducts.map(p => <li key={p.id}>{p.pname} x {p.count}</li>)}
            </ul>
        </div>
    )
}

  const handleAddToCart = (p) => {
  //tuotteen lisääminen ostoskoriin toiminto tähän
  const prod = cartSignal.value.find(prod => prod.id === p.id)
  if(prod){
      prod.count++;
      cartSignal.value = [...cartSignal.value]
  }else{
      cartSignal.value = [...cartSignal.value, {...p, count: 1}]
  }
  };

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
        <button onClick={handleAddToCart}>Lisää ostoskoriin</button>
      </div>
    </div>
  );
};

export default ProductDetails;
