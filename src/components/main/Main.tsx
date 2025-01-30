import { Component, ReactNode } from 'react';
import './Main.css';
import { Header } from '../top-controls/header/Header.tsx';
import { Search } from '../top-controls/search/Search.tsx';
import { Results } from '../results/Results.tsx';
import { CharacterInfo, PaginatedResponse } from '../../domain/IApiResponse.ts';
import getDataFromApi from '../../services/getDataFromApi.ts';
import { CardList } from '../results/card-list/CardList.tsx';

interface IState {
  results: CharacterInfo[];
  isLoading: boolean;
  isStart: boolean;
}

export class Main extends Component<unknown, IState> {
  state = {
    results: [],
    isLoading: false,
    isStart: true, // is needed to prevent rendering 'not found message' at the beginning
  };

  handleSearch = async (searchTerm?: string): Promise<void> => {
    this.setState({ isLoading: true, isStart: false });
    const data: CharacterInfo[] = await this.fetchData(searchTerm);
    this.setState({
      results: data,
      isLoading: false,
    });
  };

  fetchData = async (searchTerm?: string): Promise<CharacterInfo[]> => {
    const response: PaginatedResponse<CharacterInfo> =
      await getDataFromApi(searchTerm);
    return response.results;
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
        >
          <CardList results={this.state.results}></CardList>
        </Results>
      </div>
    );
  }
}
