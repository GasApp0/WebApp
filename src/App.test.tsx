import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './screens/Home';

test('renders home page', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const heading = screen.getByText(/Cylinder Size/i);
  expect(heading).toBeInTheDocument();
});
