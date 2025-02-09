import './Main.css';
import { ReactNode, useEffect } from 'react';
import { IResult } from '../../domain/IResults.ts';
import Results from '../results/Results.tsx';
import CardList from '../results/card-list/CardList.tsx';
import Header from '../top-controls/header/Header.tsx';
import Search from '../top-controls/search/Search.tsx';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import useFetchResults from '../../hooks/useFetchResults.ts';
import { useSearchParams } from 'react-router';
import { QueryParameters } from '../../common/enums/query-parameters.ts';
import { DEFAULT_PAGE } from '../../constants/constants.ts';

const Main = (): ReactNode => {
  const [storedValue, handleChange] = useLocalStorage();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get(QueryParameters.PAGE);

  useEffect(() => {
    if (!currentPage) {
      searchParams.set(QueryParameters.PAGE, DEFAULT_PAGE.toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, searchParams, setSearchParams]);

  const results: IResult = useFetchResults(
    storedValue,
    searchParams.get(QueryParameters.PAGE)
  );

  return (
    <div className="w-full">
      <Header>
        <Search storedValue={storedValue} handleChange={handleChange} />
      </Header>
      <div className="split-line"></div>
      <Results
        isFound={
          !!results.paginationData && results.paginationData.results.length > 0
        }
        isLoading={results.statusData.isLoading}
        isStart={results.statusData.isStart}
        serverError={results.statusData.serverError}
      >
        {results.paginationData ? (
          <CardList paginatedData={results.paginationData}></CardList>
        ) : null}
      </Results>
    </div>
  );
};

export default Main;
