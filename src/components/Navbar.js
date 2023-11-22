import React from 'react'
import { Link } from "react-router-dom"
import './Navbar.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-white">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Etusivu</Nav.Link>
                        <Nav.Link as={Link} to="/meista">Meistä</Nav.Link>
<<<<<<< HEAD
=======
                        <Nav.Link as={Link} to="/tuoteryhmät">Tuoteryhmät</Nav.Link>
>>>>>>> cec5ce1685707f448ae33b10c0cdfdc9c460205b
                        <NavDropdown title="Vaatteet" className="custom-dropdown">
                            <NavDropdown.Item as={Link} to="/vaatteet/naiset">Naiset</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/vaatteet/miehet">Miehet</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
