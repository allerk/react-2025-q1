import { ReactNode } from 'react';
import './CardList.css';
import { CharacterInfo } from '../../../domain/IApiResponse.ts';
import Card from '../card/Card.tsx';

interface IProps {
  results: CharacterInfo[];
}

const CardList = ({ results }: IProps): ReactNode => {
  return (
    <ul className="flex justify-center items-stretch flex-wrap">
      {results.map((item) => (
        <Card key={item.name} item={item}></Card>
      ))}
    </ul>
  );
};

export default CardList;
