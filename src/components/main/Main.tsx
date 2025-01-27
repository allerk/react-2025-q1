import { Component } from 'react';
import './Main.css';
import { Header } from '../top-controls/header/Header.tsx';
import { Search } from '../top-controls/search/Search.tsx';
import { Results } from '../results/Results.tsx';

export class Main extends Component {
  render() {
    return (
      <div className="w-full">
        <Header>
          <Search />
        </Header>
        <div className="split-line"></div>
        <Results></Results>
      </div>
    );
  }
}
