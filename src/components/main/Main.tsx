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
import { CharacterInfo, PaginatedResponse } from '../../domain/IApiResponse.ts';

const Main = (): ReactNode => {
  const [storedValue, handleChange] = useLocalStorage();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage: string | null = searchParams.get(QueryParameters.PAGE);

  useEffect(() => {
    if (!currentPage || Number(currentPage) < 1) {
      searchParams.set(QueryParameters.PAGE, DEFAULT_PAGE.toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, searchParams, setSearchParams]);

  const results: IResult<PaginatedResponse<CharacterInfo>> = useFetchResults<
    PaginatedResponse<CharacterInfo>
  >(storedValue, currentPage);

  return (
    <div className="w-full">
      <Header>
        <Search storedValue={storedValue} handleChange={handleChange} />
      </Header>
      <div className="split-line"></div>
      <Results statusData={results.statusData}>
        {results.responseData ? (
          <CardList responseData={results.responseData}></CardList>
        ) : null}
      </Results>
    </div>
  );
};

export default Main;
