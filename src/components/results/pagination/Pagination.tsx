import './Pagination.css';
import { PageInfo } from '../../../domain/IApiResponse.ts';
import { useSearchParams } from 'react-router';
import { QueryParameters } from '../../../common/enums/query-parameters.ts';

interface IProps {
  pageInfo: PageInfo;
}

const Pagination = ({ pageInfo }: IProps) => {
  // TODO: fix layout css, on small screen it does not stretch as should
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage: number = Number(searchParams.get(QueryParameters.PAGE));

  const handlePageChange = (number: number) => {
    searchParams.set(QueryParameters.PAGE, number.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="pagination-section">
      <div className="md:container md:mx-auto flex justify-center items-center">
        <div className="pagination-bar">
          <div className="grid grid-rows-[auto_auto]">
            <h1 className="font-bold my-2 text-center">Page:</h1>
            <div className="flex w-full items-center">
              <button
                id="prev"
                className={`${
                  currentPage === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-700'
                } text-white font-bold py-2 px-4 rounded-full m-2 w-full`}
                type="submit"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                data-testid="prev"
              >
                Prev
              </button>
              <div className="py-2 text-center m-2" data-testid="currentPage">
                {currentPage}/{pageInfo.totalPages}
              </div>
              <button
                id="next"
                className={`${
                  pageInfo.totalPages === currentPage
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-700'
                } text-white font-bold py-2 px-4 rounded-full m-2 w-full`}
                type="submit"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={pageInfo.totalPages === currentPage}
                data-testid="next"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
