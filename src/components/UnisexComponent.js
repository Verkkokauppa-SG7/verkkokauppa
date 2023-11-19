// UnisexComponent.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ClothesComponent.css'

const UnisexComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:3001/categories?category_type=Unisex')
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching Unisex data:', error));
  }, []);

  // Only category to show 
  const targetCategory = 'Unisex';

  // Filter the data to include only items from the target category
  const filteredData = data.filter((category) => category.categoryType === targetCategory);


  return (
    <div>
      <h2>Unisex vaatteet</h2>
      <ul>
        {filteredData.map((category) => (
          <li key={category.categoryName}>
            {/* Use Link to navigate to the product page */}
            <Link to={`/tuotteet/${category.categoryName}`}>
              <h2>{category.categoryName}</h2>
            </Link>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnisexComponent;