import { Component } from 'react';
import './Search.css';

export class Search extends Component {
  render() {
    return (
      <form role="form" className="m-2">
        <label className="flex">
          <input
            placeholder="Type character name..."
            className="w-2/3 input-style"
            type="text"
            step="any"
          />
          <div className="w-1/3 flex justify-center items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Search
            </button>
          </div>
        </label>
      </form>
    );
  }
}
