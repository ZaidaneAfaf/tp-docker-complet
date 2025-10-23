import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="/images/logoVoiture.jpg" width="25" height="25" alt="Logo" />
                </Link>
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Ajouter Voiture</Link>
                    <Link to={"list"} className="nav-link">Liste Voitures</Link>
                    <Link to={"add-proprietaire"} className="nav-link">Ajouter Propriétaire</Link>
                    <Link to={"proprietaires"} className="nav-link">Liste Propriétaires</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;