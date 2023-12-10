import React from "react";
import { Link } from 'react-router-dom';

const OrderButton = () => {
    return (
        <Link to="/tilaaminen">
            <button>Tilaa tuotteet</button>
        </Link>
    )
};

export default OrderButton;