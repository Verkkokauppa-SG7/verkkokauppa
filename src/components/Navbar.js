import React from 'react'
import {Link} from "react-router-dom"
import './Navbar.css'

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Etusivu</Link></li>
                <li><Link to="/vaatteet">Vaatteet</Link></li>
                <li><Link to="/kengat">Kengät</Link></li>
                <li><Link to="/laukut">Laukut</Link></li>
                <li><Link to="/asusteet">Asusteet</Link></li>
            </ul>
        </nav>
    )
}