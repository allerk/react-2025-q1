import { Component } from 'react';
import { CardList } from './card-list/CardList.tsx';
import './Results.css';

export class Results extends Component {
  render() {
    return (
      <section className="items-start justify-center">
        <div className="md:container md:mx-auto">
          <CardList></CardList>
        </div>
      </section>
    );
  }
}
