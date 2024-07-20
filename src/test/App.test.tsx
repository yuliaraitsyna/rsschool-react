import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "../components/theme/ThemeProvider";
import App from "../App";

test('renders App component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  
    expect(screen.getByText(/Star Wars search/i)).toBeInTheDocument();
});


