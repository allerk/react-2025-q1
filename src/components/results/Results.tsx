import { Component, ReactNode } from 'react';
import './Results.css';
import { Loader } from '../../common/widgets/loader/Loader.tsx';

interface IProps {
  children: ReactNode;
  isFound: boolean;
  isLoading: boolean;
  isStart: boolean;
}

interface IState {
  throwError: boolean;
}

export class Results extends Component<IProps, IState> {
  state = {
    throwError: false,
  };

  throwError = (): void => {
    this.setState({ throwError: true });
  };

  render(): ReactNode {
    if (this.state.throwError) {
      throw new Error('I crashed!');
    }

    const { children, isFound, isLoading, isStart } = this.props;
    return (
      <section className="items-start justify-center">
        <div className="md:container md:mx-auto">
          <Loader isLoading={isLoading}>
            {isFound ? (
              children
            ) : !isLoading && !isStart ? (
              <div className="flex justify-center">
                <p>Nothing was found. Try again!</p>
              </div>
            ) : null}
          </Loader>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={this.throwError}
            >
              Throw error
            </button>
          </div>
        </div>
      </section>
    );
  }
}
