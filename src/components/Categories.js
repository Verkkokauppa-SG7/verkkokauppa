// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import './Categories.css'; 

// Create your functional component
const Categories = () => {
  // Set up state to store the fetched data
  const [data, setData] = useState([]);

  // Use the useEffect hook to fetch data when the component mounts
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
      <h1></h1>
      <ul>
        {data.map((category, index) => (
          <li key={index}>
            <h2>{category.categoryName}</h2>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export your component for use in other parts of your application
export default Categories;
