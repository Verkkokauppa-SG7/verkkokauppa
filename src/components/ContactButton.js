import React from 'react';
import { Link } from 'react-router-dom';

const ContactButton = () => {
  return (
    <Link to="/ota-yhteytta">
      <button>Ota yhteyttä</button>
    </Link>
  );
};

export default ContactButton;