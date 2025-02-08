import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import './Search.css';
import useLocalStorage from '../../../hooks/useLocalStorage.ts';

interface IProps {
  handleSearch: (searchTerm: string) => void;
}

const Search = ({ handleSearch }: IProps): ReactNode => {
  const [storedValue, handleChange] = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState(storedValue);

  useEffect(() => {
    handleSearch(storedValue);
  }, [handleSearch, storedValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const processedTerm = searchTerm.trimEnd();
    handleChange(processedTerm);
  };

  return (
    <form role="form" className="m-2" onSubmit={(e) => handleFormSubmit(e)}>
      <label className="flex">
        <input
          placeholder="Type character name..."
          className="w-2/3 input-style"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
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
};

export default Search;
