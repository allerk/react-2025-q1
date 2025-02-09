import { useCallback, useState } from 'react';
import { getSearchTermFromLS, setSearchTermToLS } from '../services/storage.ts';

export const useLocalStorage = (): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState(() => getSearchTermFromLS());

  const handleChange = useCallback((value: string): void => {
    setSearchTermToLS(value);
    setStoredValue(value);
  }, []);

  return [storedValue, handleChange];
};

export default useLocalStorage;
