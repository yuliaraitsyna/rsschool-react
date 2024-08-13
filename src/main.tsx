import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UncontrolledForm from './components/uncontrolledFrom.tsx';
import ReactHookForm from './components/reactHookFrom.tsx';
import { Provider } from 'react-redux';
import store from './components/redux/store.ts';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>
    },
    {
      path: '/uncontrolled_form',
      element: <UncontrolledForm/>
    },
    {
      path: '/react_hook_form',
      element: <ReactHookForm/>
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider> 
  </StrictMode>
);
