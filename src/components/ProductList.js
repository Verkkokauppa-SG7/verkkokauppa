// ProductList.js returns products by category
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css'

const ProductList = () => {
  const {category_type, query} = useParams();

  console.log('Received category_type:', category_type);
  console.log('Received query:', query);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log('Route transitioned to:', category_type);
    const fetchProducts = async () => {
      try {
 
        let apiUrl;
        if (category_type) {
          // Fetch products by category
          apiUrl = `http://localhost:3001/products?category_type=${category_type}`;
        } else if (query) {
          // Fetch products by query
          apiUrl = `http://localhost:3001/products?query=${query}`;
        } else {
          // Fetch all products if neither category nor query is specified
          apiUrl = 'http://localhost:3001/products';
        }

        console.log(apiUrl)

        const response = await fetch(apiUrl)
        const jsonData = await response.json();
        setProducts(jsonData);
        setLoading(false);
        console.log('jsonData:', jsonData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category_type, query]);

    if (loading) {
    // Latausindikaattori näytetään, kun hakutuloksia haetaan
    return (
      <div className="loading-spinner">
        <FontAwesomeIcon icon={faSpinner} spin />
        <span>Loading...</span>
      </div>
    );
  }

    // Check if products are available before rendering
    if (!products || products.length === 0) {
      return (
        <div>
          {query ? (
            <div>Ei tuotteita saatavilla haulle: {query}</div>
          ) : (
            <div>Ei tuotteita saatavilla valitussa tuoteryhmässä: {category_type}</div>
          )}
        </div>
      );
    }

  return (
    <div>
      <h5>Tuotteet {category_type}</h5>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
            <p>hinta {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
