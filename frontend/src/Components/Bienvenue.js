import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Bienvenue extends React.Component {
    render() {
        const marginTop = { marginTop: "20px" };
        const jumbotronStyle = {
            padding: '2rem 1rem',
            marginBottom: '2rem',
            backgroundColor: '#343a40',
            borderRadius: '0.3rem',
            color: 'white'
        };

        return (
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <div style={jumbotronStyle}>
                            <h1>Bienvenue au Magasin des Voitures</h1>
                            <blockquote className="blockquote mb-0">
                                <p>Le meilleur de nos voitures est exposé près de chez vous</p>
                                <footer className="blockquote-footer text-white-50">
                                    Master MIOLA
                                </footer>
                            </blockquote>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Bienvenue;