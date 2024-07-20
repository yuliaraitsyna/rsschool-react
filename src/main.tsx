import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './error_handling/ErrorBoundary.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './error_handling/ErrorPage.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import ThemeProvider from './components/theme/ThemeProvider.tsx'

const router = createBrowserRouter([
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
    errorElement: <ErrorPage></ErrorPage>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)