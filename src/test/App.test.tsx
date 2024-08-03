import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ThemeProvider from '../components/theme/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';

test('renders welcome message', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText(/Star Wars Search/i)).toBeInTheDocument();
});
