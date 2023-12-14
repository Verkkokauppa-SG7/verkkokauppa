import React from "react";
import axios from "axios";
import { cartSignal } from "./signals";
import { customerData } from "./CustomerSignal";

//Tilauksen lähettäminen tietokantaan
const OrderForm = () => {

    console.log(customerData.value);
    console.log(cartSignal.value);

    const customerId = customerData.value.customer_id;
    const customerFname = customerData.value.fname;
    const customerLname = customerData.value.lname;

    const orderData = {
        customerId,
        products: cartSignal.value.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
        })),
        };
        
    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3001/order', orderData)

        if (response.status === 200) {
            console.log('Tilaus lähetetty');
            alert("Tilaus lähetetty");
        } else {
            console.error('Tilauksen lähetyksessä tapahtui virhe');
            alert("Tilauksen lähetyksessä tapahtui virhe");
        }
    } catch (error) {
        console.error('Virhe tilauksen lähetyksessä:', error);
    }
    };

    return (
        <div>
            <h1>Tilaus</h1>
            <p>{customerFname} {customerLname}</p>
            <p>Asiakasnumero: {customerId}</p>
            <button onClick={handleSubmit}>Lähetä tilaus</button>
        </div>
    )
};

export default OrderForm;
