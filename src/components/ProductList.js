// ProductList.js returns products by category
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const {categoryType} = useParams;
  console.log('Received categoryType:', categoryType);
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Route transitioned to:', categoryType);
    const fetchProducts = async () => {
      try {
        // Fetch products by category
        const response = await fetch(`http://localhost:3001/products?category_type=${categoryType}`)
        const jsonData = await response.json();
        setProducts(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryType]);

    // Check if products are available before rendering
    if (!products || products.length === 0) {
      return <div>No products available for {categoryType}</div>;
    }

  return (
    <div>
      <h1>Tuotteet tuoteryhmässä {categoryType}</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
