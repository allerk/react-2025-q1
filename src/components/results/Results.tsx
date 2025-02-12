import { ReactNode, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { QueryParameters } from '../../common/enums/query-parameters.ts';
import Loader from '../../common/widgets/loader/Loader.tsx';
import './Results.css';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('I crashed!');
  }

  const isDetails = Boolean(searchParams.get(QueryParameters.DETAILS));

  const handleCloseDetails = () => {
    if (isDetails) {
      searchParams.delete(QueryParameters.DETAILS);
      setSearchParams(searchParams);
    }
  };

  return (
    <section className="items-start justify-center">
      <div className="md:container md:mx-auto">
        <div className="flex">
          <div
            className={`transition-all duration-300 ${isDetails ? 'w-2/3' : 'w-full'}`}
            onClick={handleCloseDetails}
          >
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
          </div>
          {isDetails && <Outlet />}
        </div>
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
