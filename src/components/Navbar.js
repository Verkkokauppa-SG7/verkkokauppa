import React from 'react'
import { Link } from "react-router-dom"
import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-white">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Etusivu</Nav.Link>
                        <Nav.Link as={Link} to="/meista">Meistä</Nav.Link>
                        <Nav.Link as={Link} to="/vaatteet">Vaatteet</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}