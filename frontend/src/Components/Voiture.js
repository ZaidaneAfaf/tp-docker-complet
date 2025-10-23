import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

class Voiture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marque: '',
            modele: '',
            couleur: '',
            immatricule: '',
            annee: '',
            prix: '',
            show: false,
            toastMessage: '',
            toastType: 'success'
        };
    }

    voitureChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetVoiture = () => {
        this.setState({
            marque: '',
            modele: '',
            couleur: '',
            immatricule: '',
            annee: '',
            prix: ''
        });
    }

    submitVoiture = event => {
        event.preventDefault();

        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: parseInt(this.state.annee),
            prix: parseInt(this.state.prix)
        };

        axios.post("http://localhost:8085/api/voitures", voiture)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        marque: '',
                        modele: '',
                        couleur: '',
                        immatricule: '',
                        annee: '',
                        prix: '',
                        show: true,
                        toastMessage: 'Voiture enregistrée avec succès !',
                        toastType: 'success'
                    });

                    setTimeout(() => {
                        this.setState({show: false});
                        window.location.href = '/list';
                    }, 2000);
                }
            })
            .catch(error => {
                console.error("Erreur:", error);
                this.setState({
                    show: true,
                    toastMessage: 'Erreur lors de l\'ajout de la voiture',
                    toastType: 'danger'
                });
                setTimeout(() => this.setState({show: false}), 3000);
            });
    }

    render() {
        const { marque, modele, couleur, immatricule, annee, prix, show, toastMessage, toastType } = this.state;

        return (
            <div>
                <div style={{display: show ? "block" : "none"}}>
                    <MyToast show={show} message={toastMessage} type={toastType} />
                </div>

                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare} /> Ajouter Voiture
                    </Card.Header>
                    <Form onSubmit={this.submitVoiture} onReset={this.resetVoiture} id="VoitureFormId">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formGridMarque">
                                        <Form.Label>Marque</Form.Label>
                                        <Form.Control required
                                            type="text" name="marque"
                                            value={marque} onChange={this.voitureChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez Marque Voiture" />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formGridModele">
                                        <Form.Label>Modèle</Form.Label>
                                        <Form.Control required
                                            type="text" name="modele"
                                            value={modele} onChange={this.voitureChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez Modèle Voiture" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="formGridCouleur">
                                        <Form.Label>Couleur</Form.Label>
                                        <Form.Control required
                                            type="text" name="couleur"
                                            value={couleur} onChange={this.voitureChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez Couleur Voiture" />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formGridImmatricule">
                                        <Form.Label>Immatricule</Form.Label>
                                        <Form.Control required
                                            type="text" name="immatricule"
                                            value={immatricule} onChange={this.voitureChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez Immatricule" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="formGridAnnee">
                                        <Form.Label>Année</Form.Label>
                                        <Form.Control required
                                            type="number" name="annee"
                                            value={annee} onChange={this.voitureChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez Année Voiture" />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formGridPrix">
                                        <Form.Label>Prix</Form.Label>
                                        <Form.Control required
                                            type="number" name="prix"
                                            value={prix} onChange={this.voitureChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez Prix Voiture" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faPlusSquare} /> Submit
                            </Button>
                            {' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Voiture;