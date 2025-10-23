import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

class ProprietaireListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proprietaires: [],
            loading: true,
            error: null,
            show: false,
            toastMessage: '',
            toastType: 'success'
        };
    }

    componentDidMount() {
        this.loadProprietaires();
    }

    loadProprietaires = () => {
        axios.get("http://localhost:8085/api/proprietaires")
            .then(response => response.data)
            .then((data) => {
                const proprietaires = Array.isArray(data)
                    ? data
                    : data._embedded?.proprietaires || [];

                this.setState({
                    proprietaires: proprietaires,
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

    deleteProprietaire = (proprietaireId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce propriétaire ?")) {
            axios.delete(`http://localhost:8085/api/proprietaires/${proprietaireId}`)
                .then(response => {
                    if (response.status === 200 || response.status === 204) {
                        this.setState({
                            show: true,
                            toastMessage: 'Propriétaire supprimé avec succès !',
                            toastType: 'success'
                        });

                        setTimeout(() => {
                            this.setState({show: false});
                            this.loadProprietaires();
                        }, 2000);
                    }
                })
                .catch(error => {
                    console.error("Erreur:", error);
                    this.setState({
                        show: true,
                        toastMessage: 'Erreur lors de la suppression du propriétaire',
                        toastType: 'danger'
                    });
                    setTimeout(() => this.setState({show: false}), 3000);
                });
        }
    }

    render() {
        const { proprietaires, loading, error, show, toastMessage, toastType } = this.state;

        if (loading) {
            return (
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faUser} /> Liste des Propriétaires
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
                        <FontAwesomeIcon icon={faUser} /> Liste des Propriétaires
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
                        <FontAwesomeIcon icon={faUser} /> Liste des Propriétaires
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proprietaires.length === 0 ? (
                                    <tr align="center">
                                        <td colSpan="4">Aucun Propriétaire disponible</td>
                                    </tr>
                                ) : (
                                    proprietaires.map((proprietaire) => (
                                        <tr key={proprietaire.id}>
                                            <td>{proprietaire.id}</td>
                                            <td>{proprietaire.nom}</td>
                                            <td>{proprietaire.prenom}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => this.deleteProprietaire(proprietaire.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} /> Supprimer
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

export default ProprietaireListe;