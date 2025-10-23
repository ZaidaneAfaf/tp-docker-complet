import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

class VoitureListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: [],
            loading: true,
            error: null,
            show: false,
            toastMessage: '',
            toastType: 'success',
            searchMarque: '',
            searchCouleur: ''
        };
    }

    componentDidMount() {
        this.loadVoitures();
    }

    loadVoitures = () => {
        axios.get("http://localhost:8085/api/voitures")
            .then(response => response.data)
            .then((data) => {
                const voitures = Array.isArray(data)
                    ? data
                    : data._embedded?.voitures || [];

                this.setState({
                    voitures: voitures,
                    loading: false
                });
            })
            .catch(error => {
                console.error("Erreur:", error);
                this.setState({
                    error: error.message,
                    loading: false
                });
            });
    }

    deleteVoiture = (voitureId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
            axios.delete(`http://localhost:8085/api/voitures/${voitureId}`)
                .then(response => {
                    if (response.status === 200 || response.status === 204) {
                        this.setState({
                            show: true,
                            toastMessage: 'Voiture supprimée avec succès !',
                            toastType: 'success'
                        });

                        setTimeout(() => {
                            this.setState({show: false});
                            this.loadVoitures();
                        }, 2000);
                    }
                })
                .catch(error => {
                    console.error("Erreur:", error);
                    this.setState({
                        show: true,
                        toastMessage: 'Erreur lors de la suppression de la voiture',
                        toastType: 'danger'
                    });
                    setTimeout(() => this.setState({show: false}), 3000);
                });
        }
    }

    editVoiture = (voitureId) => {
        window.location.href = `/edit/${voitureId}`;
    }

    handleSearchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Filtrage côté client (simple)
    getFilteredVoitures = () => {
        const { voitures, searchMarque, searchCouleur } = this.state;

        return voitures.filter(voiture => {
            const matchesMarque = searchMarque === '' ||
                voiture.marque.toLowerCase().includes(searchMarque.toLowerCase());
            const matchesCouleur = searchCouleur === '' ||
                voiture.couleur.toLowerCase().includes(searchCouleur.toLowerCase());

            return matchesMarque && matchesCouleur;
        });
    }

    render() {
        const { loading, error, show, toastMessage, toastType, searchMarque, searchCouleur } = this.state;
        const filteredVoitures = this.getFilteredVoitures();

        if (loading) {
            return (
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Liste des Voitures
                    </Card.Header>
                    <Card.Body>
                        <p className="text-center">Chargement...</p>
                    </Card.Body>
                </Card>
            );
        }

        if (error) {
            return (
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Liste des Voitures
                    </Card.Header>
                    <Card.Body>
                        <p className="text-danger">Erreur: {error}</p>
                    </Card.Body>
                </Card>
            );
        }

        return (
            <div>
                <div style={{display: show ? "block" : "none"}}>
                    <MyToast show={show} message={toastMessage} type={toastType} />
                </div>

                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Liste des Voitures
                    </Card.Header>
                    <Card.Body>
                        {/* Barre de recherche */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <FontAwesomeIcon icon={faSearch} /> Recherche par Marque
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="searchMarque"
                                        value={searchMarque}
                                        onChange={this.handleSearchChange}
                                        className="bg-dark text-white"
                                        placeholder="Filtrer par marque..."
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <FontAwesomeIcon icon={faSearch} /> Recherche par Couleur
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="searchCouleur"
                                        value={searchCouleur}
                                        onChange={this.handleSearchChange}
                                        className="bg-dark text-white"
                                        placeholder="Filtrer par couleur..."
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>Marque</th>
                                    <th>Modèle</th>
                                    <th>Couleur</th>
                                    <th>Immatricule</th>
                                    <th>Année</th>
                                    <th>Prix</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVoitures.length === 0 ? (
                                    <tr align="center">
                                        <td colSpan="7">Aucune Voiture ne correspond aux critères</td>
                                    </tr>
                                ) : (
                                    filteredVoitures.map((voiture) => (
                                        <tr key={voiture.id}>
                                            <td>{voiture.marque}</td>
                                            <td>{voiture.modele}</td>
                                            <td>{voiture.couleur}</td>
                                            <td>{voiture.immatricule}</td>
                                            <td>{voiture.annee}</td>
                                            <td>{voiture.prix}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-primary"
                                                        onClick={() => this.editVoiture(voiture.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>{' '}
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => this.deleteVoiture(voiture.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default VoitureListe;