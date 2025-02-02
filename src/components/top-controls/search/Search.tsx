import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import './Search.css';
import {
  getSearchValuesFromLS,
  setSearchTermToLS,
} from '../../../services/storage.ts';

interface IProps {
  handleSearch: (searchTerm: string) => void;
}

interface IState {
  searchTerm: string;
}

export class Search extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchTerm: getSearchValuesFromLS(),
    };
    this.props.handleSearch(this.state.searchTerm);
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: event.target.value });
  };

  handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const processedTerm = this.state.searchTerm.trimEnd();
    setSearchTermToLS(processedTerm);
    this.props.handleSearch(processedTerm);
  };

  render(): ReactNode {
    return (
      <form
        role="form"
        className="m-2"
        onSubmit={(e) => this.handleFormSubmit(e)}
      >
        <label className="flex">
          <input
            placeholder="Type character name..."
            className="w-2/3 input-style"
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
          />
          <div className="w-1/3 flex justify-center items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Search
            </button>
          </div>
        </label>
      </form>
    );
  }
}
