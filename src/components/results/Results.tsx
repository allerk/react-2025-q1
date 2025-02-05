import { ReactNode, useState } from 'react';
import './Results.css';
import { Loader } from '../../common/widgets/loader/Loader.tsx';

interface IProps {
  children: ReactNode;
  isFound: boolean;
  isLoading: boolean;
  isStart: boolean;
  serverError: string | null;
}

const Results = ({
  children,
  isFound,
  isLoading,
  isStart,
  serverError,
}: IProps): ReactNode => {
  const [error, setError] = useState<boolean>(false);

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('I crashed!');
  }

  return (
    <section className="items-start justify-center">
      <div className="md:container md:mx-auto">
        <Loader isLoading={isLoading}>
          {serverError ? (
            <div className="flex justify-center">
              <p>{serverError}</p>
            </div>
          ) : isFound ? (
            children
          ) : !isLoading && !isStart ? (
            <div className="flex justify-center">
              <p>Nothing was found. Try again!</p>
            </div>
          ) : null}
        </Loader>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={throwError}
          >
            Throw error
          </button>
        </div>
      </div>
    </section>
  );
};

export default Results;
