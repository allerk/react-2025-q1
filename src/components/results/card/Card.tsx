import { Component } from 'react';
import picturePlaceholder from '../../../images/picture-placeholder.jpg';
import './Card.css';

export class Card extends Component {
  render() {
    return (
      <li className="card">
        <h2>Name</h2>
        <div className="card-image">
          <img src={picturePlaceholder} alt={'404 placeholder'} />
        </div>
        <p>
          The character - <span className="bold-text">name</span> is{' '}
          <span className="red-text">height</span> height and it weighs around{' '}
          <span className="red-text">mass</span> kgs.{' '}
          <span className="bold-text">nam</span> identifies as a{' '}
          <span className="red-text">gender</span> person and has a{' '}
          <span className="red-text">eye_color</span> eyes.
        </p>
      </li>
    );
  }
}
