import React from "react";
import { Link } from 'react-router-dom';
import { jwtToken } from "./TokenSignal";

const OrderButton = () => {

//Funktio tarkistaa onko asiakas sisäänkirjautunut ja näyttää eri painiketta sen perusteella.
    function checkLogin() {
        if (jwtToken.value !== '' && jwtToken.value !== 0) {
            return (
                <Link to="/tilaaminen">
                    <button>Tilaa tuotteet</button>
                </Link>
            );
        } else {
            return (
                <Link to="/login">
                    <button>Sisäänkirjautumiseen</button>
                </Link>
            );
        }
    };

    return (
        <>
            {checkLogin()}
        </>
    );
};

export default OrderButton;