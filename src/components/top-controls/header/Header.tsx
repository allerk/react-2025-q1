import { Component, ReactNode } from 'react';
import './Header.css';

interface IProps {
  children: ReactNode;
}

export class Header extends Component<IProps> {
  render() {
    const { children } = this.props;
    return (
      <header className="header-section">
        <div className="md:container md:mx-auto flex justify-center h-full items-center">
          <div className="header-bar">
            <div className="grid grid-rows-[auto_auto] gap-4">
              <h1 className="font-bold my-2 text-center">
                Star Wars Characters
              </h1>
              {children}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
