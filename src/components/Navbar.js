import React from 'react'
import { Link } from "react-router-dom"
import '../styles/Navbar.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import SearchBar from './SearchBar.js';


export default function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-white">
            <Container>
                <Navbar.Brand>
                    <SearchBar />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Etusivu</Nav.Link>
                        <Nav.Link as={Link} to="/meista">Meistä</Nav.Link>
                        <Nav.Link as={Link} to="/tuoteryhmät">Tuoteryhmät</Nav.Link>
                        <NavDropdown title="Vaatteet" className="custom-dropdown">
                            <NavDropdown.Item as={Link} to="/vaatteet/naiset">Naiset</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/vaatteet/miehet">Miehet</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/vaatteet/unisex">Unisex</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
