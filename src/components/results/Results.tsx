import { ReactNode, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { QueryParameters } from '../../common/enums/query-parameters.ts';
import Loader from '../../common/widgets/loader/Loader.tsx';
import './Results.css';
import { IStatus } from '../../domain/IResults.ts';
import ErrorFallback from '../../common/widgets/errors/ErrorFallback.tsx';

interface IProps {
  children: ReactNode;
  statusData: IStatus;
}

const Results = ({ children, statusData }: IProps): ReactNode => {
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

  if (statusData.isLoading) {
    return <Loader />;
  }

  if (statusData.serverError) {
    return <ErrorFallback message={statusData.serverError} />;
  }

  return (
    <section className="items-start justify-center">
      <div className="md:container md:mx-auto">
        <div className="flex">
          <div
            className={`transition-all duration-300 ${isDetails ? 'w-2/3' : 'w-full'}`}
            onClick={handleCloseDetails}
          >
            {children}
          </div>
          {isDetails && (
            <div className="w-1/3">
              <div className="sticky top-20 right-20">
                <Outlet />
              </div>
            </div>
          )}
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
