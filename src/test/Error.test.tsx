import ErrorBoundary from '../error_handling/ErrorBoundary'
import { fireEvent, render, screen } from '@testing-library/react'
import ErrorButton from '../error_handling/ErrorButton';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ThemeProvider from '../components/theme/ThemeProvider';
import App from '../App';
import ErrorPage from '../error_handling/ErrorPage';

test("Error appears when clicking the button", () => {
    render (
        <ErrorBoundary>
            <ErrorButton></ErrorButton>
        </ErrorBoundary>
    );

    const button = screen.getByText('Trigger Error');
    fireEvent.click(button);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
});

test('renders 404 page on invalid route', () => {
  const routes = [
    {
      path: "/rsschool-react/",
      element: 
        <ErrorBoundary>
          <Provider store={store}>
            <ThemeProvider>
              <App/>
            </ThemeProvider>
          </Provider>
        </ErrorBoundary>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
    },
  ];
  
  const router = createMemoryRouter(routes, {
    initialEntries: ['/non-existent-route'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByText("Oops!")).toBeInTheDocument();
});
