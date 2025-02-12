import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { IResult } from '../domain/IResults.ts';
import getDataFromApi from '../services/getDataFromApi.ts';

const initState = <T>(): IResult<T> => ({
  paginationData: null,
  statusData: {
    isLoading: false,
    isStart: true, // is needed to prevent rendering 'not found message' at the beginning
    serverError: null,
  },
});

const useFetchResults = <T>(
  value: string,
  page?: string | null
): IResult<T> => {
  const [paginationData, setPaginationData] = useState<IResult<T>>(() =>
    initState<T>()
  );
  const prevSearch: MutableRefObject<string | null> = useRef<string | null>(
    null
  );

  const handleSearch = useCallback(async (): Promise<void> => {
    setPaginationData((prevState: IResult<T>) => ({
      ...prevState,
      statusData: {
        ...prevState.statusData,
        isLoading: true,
        isStart: false,
        serverError: null,
      },
    }));
    try {
      const data: T | null = await getDataFromApi<T>(
        value,
        page,
        prevSearch.current
      );
      prevSearch.current = value;
      setPaginationData((prevState: IResult<T>) => ({
        ...prevState,
        paginationData: data,
        statusData: {
          ...prevState.statusData,
          results: data,
          isLoading: false,
        },
      }));
    } catch (e) {
      const error = e as AxiosError;
      setPaginationData((prevState: IResult<T>) => ({
        ...prevState,
        statusData: {
          ...prevState.statusData,
          isLoading: false,
          serverError: error.message,
        },
      }));
    }
  }, [page, value]);

  useEffect(() => {
    handleSearch();
  }, [value, page, handleSearch]);

  return paginationData as IResult<T>;
};

export default useFetchResults;
