import { ReactNode } from 'react';
import './Loader.css';

const Loader = (): ReactNode => {
  return (
    <div className="md:container md:mx-auto flex justify-center h-full items-center">
      <div className="loader" data-testid="loader"></div>
    </div>
  );
};

export default Loader;
