import React from 'react';
import { jwtToken } from '../components/TokenSignal';
import { customerData } from '../components/CustomerSignal';

export default function CustomerInfo() {
  return (
    <div>
        <h3>Asiakastiedot:</h3>
        {customerData.value && <h2>{'Nimi: ' + customerData.value.fname + ' ' + customerData.value.lname}</h2>}
        <br></br>
        <button onClick={()=> jwtToken.value = ''}>Kirjaudu ulos</button>
    </div>
  )
};
