import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

class EditVoiture extends Component {
    constructor(props) {
        super(props);
        // Récupère l'ID depuis l'URL
        const pathParts = window.location.pathname.split('/');
        const voitureId = pathParts[pathParts.length - 1];

        this.state = {
            id: voitureId,
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

    componentDidMount() {
        this.loadVoiture();
    }

    loadVoiture = () => {
        axios.get(`http://localhost:8085/api/voitures/${this.state.id}`)
            .then(response => {
                const voiture = response.data;
                this.setState({
                    marque: voiture.marque,
                    modele: voiture.modele,
                    couleur: voiture.couleur,
                    immatricule: voiture.immatricule,
                    annee: voiture.annee,
                    prix: voiture.prix
                });
            })
            .catch(error => {
                console.error("Erreur:", error);
            });
    }

    voitureChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    updateVoiture = event => {
        event.preventDefault();

        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: parseInt(this.state.annee),
            prix: parseInt(this.state.prix)
        };

        axios.put(`http://localhost:8085/api/voitures/${this.state.id}`, voiture)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        show: true,
                        toastMessage: 'Voiture modifiée avec succès !',
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
                    toastMessage: 'Erreur lors de la modification',
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
                        <FontAwesomeIcon icon={faCar} /> Modifier Voiture
                    </Card.Header>
                    <Form onSubmit={this.updateVoiture} id="VoitureFormId">
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
                            <Button size="sm" variant="primary" type="submit">
                                Modifier
                            </Button>
                            {' '}
                            <Button size="sm" variant="warning" type="button" onClick={() => window.location.href = '/list'}>
                                <FontAwesomeIcon icon={faUndo} /> Annuler
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default EditVoiture;