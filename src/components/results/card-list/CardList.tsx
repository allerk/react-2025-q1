import { Component, ReactNode } from 'react';
import { Card } from '../card/Card.tsx';
import './CardList.css';
import { CharacterInfo } from '../../../domain/IApiResponse.ts';

interface IProps {
  results: CharacterInfo[];
}

export class CardList extends Component<IProps> {
  render(): ReactNode {
    const { results } = this.props;
    return (
      <ul className="flex justify-center items-stretch flex-wrap">
        {results.map((item) => (
          <Card key={item.name} item={item}></Card>
        ))}
      </ul>
    );
  }
}
