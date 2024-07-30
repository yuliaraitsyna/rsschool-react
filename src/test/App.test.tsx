import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../components/redux/store";
import ThemeProvider from "../components/theme/ThemeProvider";
import App from "../components/home/App"
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "src/mocks/mockRouter";
import { starWarsAPI } from "../components/redux/starWarsAPI";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import '@testing-library/jest-dom';


test('renders App component', async () => {
    render(
      <ThemeProvider>
        <ApiProvider api={starWarsAPI}>
          <Provider store={store}>
            <RouterContext.Provider value={mockRouter}>
              <App></App>
            </RouterContext.Provider>
          </Provider>
        </ApiProvider>
      </ThemeProvider>
    );
  
    await waitFor(() => {
      expect(screen.getByText(/Star Wars Search/i)).toBeInTheDocument();
    });
});


