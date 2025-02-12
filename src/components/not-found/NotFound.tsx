import { useNavigate } from 'react-router';
import { ReactNode } from 'react';

const NotFound = (): ReactNode => {
  const navigate = useNavigate();

  return (
    <div className="justify-center items-center">
      <h1>Page not found!</h1>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
  );
};

export default NotFound;
