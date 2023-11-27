// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Categories.css'; 
import { useParams } from 'react-router-dom';

// Fetching and returning categories with link to products in category
const Categoriesbyname = () => {
  // Set up state to store the fetched data
  const {category_type} = useParams();
  console.log('Received category_type:', category_type);
  const [data, setData] = useState([]);

  // Fetching categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching from API the categories by category type
        const response = await fetch(`http://localhost:3001/categories?category_type=${category_type}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [category_type]); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  // Render the component with the fetched data
  return (
    <div>
      <h1>Tuoteryhmät {category_type} </h1>
      <ul>
        {data.map((category, index) => (
          <li key={index}>
            {/* Use Link to navigate to the product page with the selected category */}
            <Link to={`/tuotteet/${category_type}/${category.categoryName}`}>
              <h2>{category.categoryName}</h2>
            </Link>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting the categories
export default Categoriesbyname;
