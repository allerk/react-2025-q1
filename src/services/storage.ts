import { LOCAL_STORAGE_KEY } from '../constants/constants.ts';

export const setSearchTermToLS = (searchTerm: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);
};

export const getSearchValuesFromLS = (): string => {
  return localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';
};
