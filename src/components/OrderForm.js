import React from "react";
import axios from "axios";
import { cartSignal } from "./signals";
import { customerData } from "./CustomerSignal";

//Tilauksen lähettäminen tietokantaan
//Tämä ei vielä toimi täysin: tarvittava data ei tule oikein tai ollenkaan?
const OrderForm = () => {

    const customerId = customerData.value.customer_id;
    const cartProducts = cartSignal.value;
        
    console.log(customerData.value);
    console.log(cartSignal.value);
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const orderData = {
            customerId,
            cartProducts,
            };

    try {
        const response = await axios.post('http://localhost:3001/order', orderData)

        if (response.ok) {
            console.log('Tilaus lähetetty');
        } else {
            console.error('Tilauksen lähetyksessä tapahtui virhe');
        }
    } catch (error) {
        console.error('Virhe tilauksen lähetyksessä:', error);
    }
    };

    return (
        <div>
            <h1>Tilaus</h1>
            <button onClick={handleSubmit}>Lähetä tilaus</button>
        </div>
    )
};

export default OrderForm;
