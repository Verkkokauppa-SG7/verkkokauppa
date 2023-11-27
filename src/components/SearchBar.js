import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css'

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
  const path = query ? `/hakutulokset/${query}` : '/tuoteryhmät';
  navigate(path);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Etsi tuotteita"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Hae</button>
    </div>
  );
};

export default SearchBar;
