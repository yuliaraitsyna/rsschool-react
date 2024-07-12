import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders title "Star Wars search"', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  
  const titleElement = screen.getByRole('heading', { level: 1 });
  
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent('Star Wars search');
});
