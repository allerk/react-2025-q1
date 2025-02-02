import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './common/widgets/errors/ErrorBoundary.tsx';

const root = document.getElementById('root'); // to fix eslint S2345 error. document.getElementById('root')! does not work.

createRoot(root as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
