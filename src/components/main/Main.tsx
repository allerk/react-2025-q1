import { ReactNode, useCallback, useState } from 'react';
import './Main.css';
import { CharacterInfo, PaginatedResponse } from '../../domain/IApiResponse.ts';
import getDataFromApi from '../../services/getDataFromApi.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Results from '../results/Results.tsx';
import CardList from '../results/card-list/CardList.tsx';
import Header from '../top-controls/header/Header.tsx';
import Search from '../top-controls/search/Search.tsx';

interface IState {
  results: CharacterInfo[];
  isLoading: boolean;
  isStart: boolean;
  serverError: string | null;
}

const initState: IState = {
  results: [],
  isLoading: false,
  isStart: true, // is needed to prevent rendering 'not found message' at the beginning
  serverError: null,
};

const Main = (): ReactNode => {
  const [data, setData] = useState<IState>(initState);

  const handleSearch = useCallback(
    async (searchTerm?: string): Promise<void> => {
      setData((prevState) => ({
        ...prevState,
        isLoading: true,
        isStart: false,
        serverError: null,
      }));
      const data: CharacterInfo[] = await fetchData(searchTerm);
      setData((prevState) => ({
        ...prevState,
        results: data,
        isLoading: false,
      }));
    },
    []
  );

  const fetchData = async (searchTerm?: string): Promise<CharacterInfo[]> => {
    try {
      const response: PaginatedResponse<CharacterInfo> =
        await getDataFromApi(searchTerm);
      return response.results;
    } catch (e) {
      const error = e as AxiosError;
      const response: AxiosResponse | undefined = error.response;
      if (response && response.status >= 400) {
        const error: string = `Star Wars API server failed. With status code ${response.status}`;
        setData((prevState) => ({
          ...prevState,
          serverError: error,
        }));
      }
      return [];
    }
  };

  return (
    <div className="w-full">
      <Header>
        <Search handleSearch={handleSearch} />
      </Header>
      <div className="split-line"></div>
      <Results
        isFound={data.results.length > 0}
        isLoading={data.isLoading}
        isStart={data.isStart}
        serverError={data.serverError}
      >
        <CardList results={data.results}></CardList>
      </Results>
    </div>
  );
};

export default Main;
