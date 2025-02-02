import { Component, ReactNode } from 'react';
import { Main } from './components/main/Main.tsx';

export class App extends Component {
  render(): ReactNode {
    return (
      <main className="main">
        <Main />
      </main>
    );
  }
}
