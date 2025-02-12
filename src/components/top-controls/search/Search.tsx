import { ChangeEvent, FormEvent, memo, ReactNode, useState } from 'react';
import './Search.css';
import { QueryParameters } from '../../../common/enums/query-parameters.ts';
import { useSearchParams } from 'react-router';
import { DEFAULT_PAGE } from '../../../constants/constants.ts';

interface IProps {
  storedValue: string;
  handleChange: (value: string) => void;
}

const Search = ({ storedValue, handleChange }: IProps): ReactNode => {
  const [searchTerm, setSearchTerm] = useState(storedValue);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const processedTerm = searchTerm.trimEnd();
    searchParams.set(QueryParameters.PAGE, DEFAULT_PAGE.toString());
    setSearchParams(searchParams);
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

export default memo(Search);
