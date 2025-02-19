import { ReactNode } from 'react';
import './Loader.css';

interface IProps {
  isLoading: boolean;
  children: ReactNode;
}

const Loader = ({ isLoading, children }: IProps): ReactNode => {
  if (isLoading) {
    return (
      <div className="md:container md:mx-auto flex justify-center h-full items-center">
        <div className="loader" data-testid="loader"></div>
      </div>
    );
  }

  return children;
};

export default Loader;
