import './CardList.css';
import {
  CharacterInfo,
  PaginatedResponse,
} from '../../../domain/IApiResponse.ts';
import { ReactNode, useCallback } from 'react';
import Card from '../card/Card.tsx';
import Pagination from '../pagination/Pagination.tsx';

interface IProps {
  responseData: PaginatedResponse<CharacterInfo>;
}

const CardList = ({ responseData }: IProps): ReactNode => {
  const calculatePages = useCallback((number: number): number => {
    if (number < 10) {
      return 1;
    }

    return (number / 10) % 1 !== 0 ? Math.floor(number / 10) + 1 : number / 10;
  }, []);

  return (
    <>
      <Pagination
        pageInfo={{
          next: responseData.next,
          previous: responseData.previous,
          totalPages: calculatePages(responseData.count),
        }}
      />
      <ul className="flex justify-center items-stretch flex-wrap">
        {responseData.results.map((item) => (
          <Card key={item.name} item={item}></Card>
        ))}
      </ul>
    </>
  );
};

export default CardList;
