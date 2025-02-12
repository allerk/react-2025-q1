import { ReactNode } from 'react';
import picturePlaceholder from '../../../images/picture-placeholder.jpg';
import './Card.css';
import { CharacterInfo } from '../../../domain/IApiResponse.ts';
import { Link, useSearchParams } from 'react-router';
import { QueryParameters } from '../../../common/enums/query-parameters.ts';

interface IProps {
  item: CharacterInfo;
}

const Card = ({ item }: IProps): ReactNode => {
  const [searchParams] = useSearchParams();

  const extendLinkPath = () => {
    const prepareSearchQuery = new URLSearchParams(searchParams);
    const splitElement = item.url.split('/');
    const characterId = splitElement[splitElement.length - 2];
    prepareSearchQuery.set(QueryParameters.DETAILS, characterId);
    return `?${prepareSearchQuery}`;
  };

  return (
    <li className="card" onClick={extendLinkPath}>
      <Link to={extendLinkPath()}>
        <h2>{item.name}</h2>
        <div className="card-image">
          <img src={picturePlaceholder} alt={'404 placeholder'} />
        </div>
        <p>
          The character - <span className="bold-text">{item.name}</span> is{' '}
          <span className="red-text">{item.height}</span> height and it weighs
          around <span className="red-text">{item.mass}</span> kgs.{' '}
          <span className="bold-text">{item.name}</span> identifies as a{' '}
          <span className="red-text">{item.gender}</span> person and has a{' '}
          <span className="red-text">{item.eye_color}</span> eyes.
        </p>
      </Link>
    </li>
  );
};

export default Card;
