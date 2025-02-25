import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback.tsx';

interface IState {
  hasError: boolean;
  errorMsg: string;
}

interface IProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error: Error): IState {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center">
          <ErrorFallback message={this.state.errorMsg}>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => this.setState({ hasError: false })}
            >
              Restore
            </button>
          </ErrorFallback>
        </div>
      );
    }

    return this.props.children;
  }
}
