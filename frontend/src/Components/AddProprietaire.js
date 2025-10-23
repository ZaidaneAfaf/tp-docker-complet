import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

class AddProprietaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            show: false,
            toastMessage: '',
            toastType: 'success'
        };
    }

    proprietaireChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitProprietaire = event => {
        event.preventDefault();

        const proprietaire = {
            nom: this.state.nom,
            prenom: this.state.prenom
        };

        axios.post("http://localhost:8085/api/proprietaires", proprietaire)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        nom: '',
                        prenom: '',
                        show: true,
                        toastMessage: 'Propriétaire enregistré avec succès !',
                        toastType: 'success'
                    });

                    setTimeout(() => {
                        this.setState({show: false});
                        window.location.href = '/proprietaires';
                    }, 2000);
                }
            })
            .catch(error => {
                console.error("Erreur:", error);
                this.setState({
                    show: true,
                    toastMessage: 'Erreur lors de l\'ajout du propriétaire',
                    toastType: 'danger'
                });
                setTimeout(() => this.setState({show: false}), 3000);
            });
    }

    render() {
        const { nom, prenom, show, toastMessage, toastType } = this.state;

        return (
            <div>
                <div style={{display: show ? "block" : "none"}}>
                    <MyToast show={show} message={toastMessage} type={toastType} />
                </div>

                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faUser} /> Ajouter Propriétaire
                    </Card.Header>
                    <Form onSubmit={this.submitProprietaire} id="ProprietaireFormId">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formGridNom">
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control required
                                            type="text" name="nom"
                                            value={nom} onChange={this.proprietaireChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez le nom" />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formGridPrenom">
                                        <Form.Label>Prénom</Form.Label>
                                        <Form.Control required
                                            type="text" name="prenom"
                                            value={prenom} onChange={this.proprietaireChange}
                                            className="bg-dark text-white"
                                            placeholder="Entrez le prénom" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                Ajouter
                            </Button>
                            {' '}
                            <Button size="sm" variant="warning" type="button" onClick={() => window.location.href = '/proprietaires'}>
                                <FontAwesomeIcon icon={faUndo} /> Annuler
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default AddProprietaire;