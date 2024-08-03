import App from "../../src/App";
import store from "../../src/redux/store";
import ThemeProvider from "../../src/components/theme/ThemeProvider";
import { Provider } from "react-redux";
import ErrorBoundary from "../../src/error_handling/ErrorBoundary";
import React from "react";

export default function Index() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
