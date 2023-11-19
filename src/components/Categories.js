// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css'; 

// Fetching and returning categories with link to products in category
const Categories = () => {
  // Set up state to store the fetched data
  const [data, setData] = useState([]);

  // Fetching categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual URL of your REST API
        const response = await fetch('http://localhost:3001/categories');
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  // Render the component with the fetched data
  return (
    <div>
      <ul>
        {data.map((category, index) => (
          <li key={index}>
            {console.log('Link to:', `/tuotteet/${category.categoryName}`)}
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

// Export your component for use in other parts of your application
export default Categories;
