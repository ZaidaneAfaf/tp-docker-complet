import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import EditVoiture from './Components/EditVoiture';
import AddProprietaire from './Components/AddProprietaire';
import ProprietaireListe from './Components/ProprietaireListe';
import Footer from './Components/Footer';
import './App.css';

function App() {
  const marginTop = { marginTop: "20px" };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              <Route path="/" exact element={<Bienvenue />} />
              <Route path="/add" exact element={<Voiture />} />
              <Route path="/list" exact element={<VoitureListe />} />
              <Route path="/edit/:id" exact element={<EditVoiture />} />
              <Route path="/add-proprietaire" exact element={<AddProprietaire />} />
              <Route path="/proprietaires" exact element={<ProprietaireListe />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;