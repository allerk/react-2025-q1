import { Component } from 'react';
import picturePlaceholder from '../../../images/picture-placeholder.jpg';
import './Card.css';
import { CharacterInfo } from '../../../domain/IApiResponse.ts';

interface IProps {
  item: CharacterInfo;
}

export class Card extends Component<IProps> {
  render() {
    const { item } = this.props;
    return (
      <li className="card">
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
      </li>
    );
  }
}
