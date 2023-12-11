import React from "react";
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
        const response = await fetch('http://localhost:3001/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
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
