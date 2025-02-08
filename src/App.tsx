import { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { ErrorBoundary } from './common/widgets/errors/ErrorBoundary.tsx';

const App = (): ReactNode => {
  return (
    <ErrorBoundary>
      <main className="main">
        <Outlet />
      </main>
    </ErrorBoundary>
  );
};

export default App;
