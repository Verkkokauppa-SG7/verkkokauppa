import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Adminlogin.css';

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
      const response = await axios.post(`http://localhost:3001/categories`, [
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
          'Tuoteryhmän lisäämisessä tapahtui virhe. Yritä uudelleen.'
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

  // Pre-set options for selection of category type
  const categoryOptions = ['Naiset', 'Miehet', 'Unisex'];

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleSubmit}>
          <label>
            Tuoteryhmän nimi:
            <input
              type="text"
              value={category_name}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </label>
          <label>
            Tyyppi:
            <select value={category_type} onChange={(e) => setCategoryType(e.target.value)}>
              <option value="">Valitse...</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Kuvaus:
            <br></br>
            <input
              type="text"
              value={category_description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button className="adminlogin" type="submit">LISÄÄ</button>
          <button className="adminlogin" type="button" onClick={handleReset}>TYHJENNÄ</button>
        </form>
      </div>
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
