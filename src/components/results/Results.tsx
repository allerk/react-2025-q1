import { Component, ReactNode } from 'react';
import './Results.css';

interface IProps {
  children: ReactNode;
}

export class Results extends Component<IProps> {
  render() {
    const { children } = this.props;
    return (
      <section className="items-start justify-center">
        <div className="md:container md:mx-auto">{children}</div>
      </section>
    );
  }
}
