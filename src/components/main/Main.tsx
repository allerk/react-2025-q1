import { Component, ReactNode } from 'react';
import './Main.css';
import { Header } from '../top-controls/header/Header.tsx';
import { Search } from '../top-controls/search/Search.tsx';
import { CharacterInfo, PaginatedResponse } from '../../domain/IApiResponse.ts';
import getDataFromApi from '../../services/getDataFromApi.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Results from '../results/Results.tsx';
import CardList from '../results/card-list/CardList.tsx';

interface IState {
  results: CharacterInfo[];
  isLoading: boolean;
  isStart: boolean;
  serverError: string | null;
}

export class Main extends Component<unknown, IState> {
  state = {
    results: [],
    isLoading: false,
    isStart: true, // is needed to prevent rendering 'not found message' at the beginning
    serverError: null,
  };

  handleSearch = async (searchTerm?: string): Promise<void> => {
    this.setState({ isLoading: true, isStart: false, serverError: null });
    const data: CharacterInfo[] = await this.fetchData(searchTerm);
    this.setState({
      results: data,
      isLoading: false,
    });
  };

  fetchData = async (searchTerm?: string): Promise<CharacterInfo[]> => {
    try {
      const response: PaginatedResponse<CharacterInfo> =
        await getDataFromApi(searchTerm);
      return response.results;
    } catch (e) {
      const error = e as AxiosError;
      const response: AxiosResponse | undefined = error.response;
      if (response && response.status >= 400) {
        const error: string = `Star Wars API server failed. With status code ${response.status}`;
        this.setState({ serverError: error });
      }
      return [];
    }
  };

  render(): ReactNode {
    return (
      <div className="w-full">
        <Header>
          <Search handleSearch={this.handleSearch} />
        </Header>
        <div className="split-line"></div>
        <Results
          isFound={this.state.results.length > 0}
          isLoading={this.state.isLoading}
          isStart={this.state.isStart}
          serverError={this.state.serverError}
        >
          <CardList results={this.state.results}></CardList>
        </Results>
      </div>
    );
  }
}
