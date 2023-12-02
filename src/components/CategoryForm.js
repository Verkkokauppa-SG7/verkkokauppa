import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CategoryForm.css';


const CategoryForm = () => {
  const [category_name, setCategoryName] = useState('');
  const [category_type, setCategoryType] = useState('');
  const [category_description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

  // Check that there is no empty input-fields
  if (!category_name || !category_type || !category_description) {
    setErrorMessage('Lisättävälle tuoteryhmälle tulee syöttää nimi, tyyppi ja kuvaus.');
    setSuccessMessage(''); // Clear success message
    return;
  }

    try {
      const response = await axios.post(`http://localhost:3001/categories`,[
        { category_name, category_type, category_description }
      ]);

      console.log(response.data); // Log the response from the server
      setSuccessMessage('Tuoteryhmä lisätty onnistuneesti!');
      setErrorMessage(''); // Clear error message
      setCategoryName(''); // Clear input fields
      setCategoryType('');
      setDescription('');

    } catch (error) {
      console.error('Error adding categories:', error.response.data);

    if (error.response && error.response.data && error.response.data.error) {
      // If the error response has a specific error message, set it
      setErrorMessage(error.response.data.error);
    } else {
      // If not, set a generic error message
      setErrorMessage(
        'An error occurred while adding categories. Please try again.'
      );
    }
    
      setSuccessMessage(''); // Clear success message
    }
  };
  
  const handleReset = () => {
    setCategoryName('');
    setCategoryType('');
    setDescription('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div>
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
        <button type="button" onClick={handleReset}>TYHJENNÄ</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default CategoryForm;
