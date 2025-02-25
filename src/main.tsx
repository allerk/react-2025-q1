import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import routes from './router/routes.tsx';

const root = document.getElementById('root'); // to fix eslint S2345 error. document.getElementById('root')! does not work.
const browserRouter = createBrowserRouter(routes);

createRoot(root as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={browserRouter}></RouterProvider>
  </StrictMode>
);
