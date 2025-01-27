import { Component } from 'react';
import { Card } from '../card/Card.tsx';
import './CardList.css';

export class CardList extends Component {
  render() {
    return (
      <ul className="flex justify-center items-stretch flex-wrap">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </ul>
    );
  }
}
