import { Component, ErrorInfo, ReactNode } from 'react';

interface IState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h1 style={{ fontWeight: 'bold' }}>Something went wrong.</h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => this.setState({ hasError: false })}
          >
            Restore
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
