import { Component, ReactNode } from 'react';
import './Results.css';
import { Loader } from '../../common/widgets/loader/Loader.tsx';

interface IProps {
  children: ReactNode;
  isFound: boolean;
  isLoading: boolean;
  isStart: boolean;
}

export class Results extends Component<IProps> {
  render() {
    const { children, isFound, isLoading, isStart } = this.props;
    return (
      <section className="items-start justify-center">
        <Loader isLoading={isLoading}>
          <div className="md:container md:mx-auto">
            {isFound ? (
              children
            ) : !isLoading && !isStart ? (
              <div className="flex justify-center">
                <p>Nothing was found. Try again!</p>
              </div>
            ) : null}
          </div>
        </Loader>
      </section>
    );
  }
}
