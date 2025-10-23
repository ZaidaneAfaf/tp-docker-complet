import React from 'react';
import { render, screen } from '@testing-library/react';
import VoitureListe from './VoitureListe';

test('affiche la liste des voitures', () => {
  render(<VoitureListe />);

  const headerElement = screen.getByText(/Liste des Voitures/i);
  expect(headerElement).toBeInTheDocument();

  const marqueHeader = screen.getByText(/Marque/i);
  expect(marqueHeader).toBeInTheDocument();
});