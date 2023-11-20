import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ClothesComponent.css';

const MenComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:3001/products?category_type=Miehet')
      .then((response) => response.json())
      .then((result) => {
        // Ensure result is an array before setting the state
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error('Invalid data format received:', result);
        }
      })
      .catch((error) => console.error('Error fetching Men data:', error));
  }, []);
      /*.then((result) => setData(result))
      .catch((error) => console.error('Error fetching Men data:', error));
  }, []);*/

  return (
    <div>
      <h2>Miesten vaatteet</h2>
      <ul>
        {data.map((product) => (
          <li key={product.productId}>
            <h2>{product.productName}</h2>
            <p>Hinta {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenComponent;
