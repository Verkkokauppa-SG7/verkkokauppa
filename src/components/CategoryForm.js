import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CategoryForm.css';


const CategoryForm = () => {
  const [category_name, setCategoryName] = useState('');
  const [category_type, setCategoryType] = useState('');
  const [category_description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/categories`,[
        { category_name, category_type, category_description }
      ]);

      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error adding categories:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tuoteryhmän nimi:
        <input
          type="text"
          value={category_name}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Tyyppi:
        <input
          type="text"
          value={category_type}
          onChange={(e) => setCategoryType(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Kuvaus:
        <input
          type="text"
          value={category_description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">LISÄÄ</button>
    </form>
  );
};

export default CategoryForm;
