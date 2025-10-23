import React from 'react';
import { render, screen } from '@testing-library/react';
import Voiture from './Voiture';

test('affiche le formulaire d\'ajout de voiture', () => {
  render(<Voiture />);

  const headerElement = screen.getByText(/Ajouter Voiture/i);
  expect(headerElement).toBeInTheDocument();

  const marqueInput = screen.getByPlaceholderText(/Entrez Marque Voiture/i);
  expect(marqueInput).toBeInTheDocument();

  const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeInTheDocument();
});