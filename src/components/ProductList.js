// ProductList.js returns products by category
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductList.css'

const ProductList = () => {
  const {category_type} = useParams();
  console.log('Received category_type:', category_type);
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Route transitioned to:', category_type);
    const fetchProducts = async () => {
      try {
        // Fetch products by category
        const response = await fetch(`http://localhost:3001/products?category_type=${category_type}`)
        const jsonData = await response.json();
        setProducts(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category_type]);

    // Check if products are available before rendering
    if (!products || products.length === 0) {
      return <div>No products available for {category_type}</div>;
    }

  return (
    <div>
      <h5>Tuotteet tuoteryhmässä {category_type}</h5>
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
