import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the login screen when signed out', () => {
  sessionStorage.clear();
  render(<App />);
  expect(screen.getByText(/login to face2alias/i)).toBeInTheDocument();
});
