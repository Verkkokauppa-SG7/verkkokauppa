import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ClothesComponent.css';

const MenComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:3001/products?category_type=Miehet')
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching Men data:', error));
  }, []);

  return (
    <div>
      <h2>Miesten vaatteet</h2>
      <ul>
        {data.map((product) => (
          <li key={product.productId}>
            {/* Use Link to navigate to the product page */}
            <Link to={`/tuotteet/${product.productId}`}>
              <h2>{product.productName}</h2>
            </Link>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenComponent;
