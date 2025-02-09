import { useEffect, useState } from 'react';
import { CharacterInfo, PaginatedResponse } from '../domain/IApiResponse.ts';
import getDataFromApi from '../services/getDataFromApi.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { IResult } from '../domain/IResults.ts';

const initState: IResult = {
  paginationData: null,
  statusData: {
    isLoading: false,
    isStart: true, // is needed to prevent rendering 'not found message' at the beginning
    serverError: null,
  },
};

const useFetchResults = (value: string, page?: string | null): IResult => {
  const [paginationData, setPaginationData] = useState<IResult>(initState);

  useEffect(() => {
    const fetchData = async (
      searchTerm?: string,
      page?: string | null
    ): Promise<PaginatedResponse<CharacterInfo> | null> => {
      try {
        return page
          ? await getDataFromApi(searchTerm, page)
          : await getDataFromApi(searchTerm);
      } catch (e) {
        const error = e as AxiosError;
        const response: AxiosResponse | undefined = error.response;
        if (response && response.status >= 400) {
          const error: string = `Star Wars API server failed. With status code ${response.status}`;
          setPaginationData((prevState: IResult) => ({
            ...prevState,
            statusData: {
              ...prevState.statusData,
              serverError: error,
            },
          }));
        }
        return null;
      }
    };
    const handleSearch = async (): Promise<void> => {
      setPaginationData((prevState: IResult) => ({
        ...prevState,
        statusData: {
          ...prevState.statusData,
          isLoading: true,
          isStart: false,
          serverError: null,
        },
      }));
      const data: PaginatedResponse<CharacterInfo> | null = await fetchData(
        value,
        page
      );
      setPaginationData((prevState: IResult) => ({
        ...prevState,
        paginationData: data,
        statusData: {
          ...prevState.statusData,
          results: data,
          isLoading: false,
        },
      }));
    };
    handleSearch();
  }, [value, page]);

  return paginationData as IResult;
};

export default useFetchResults;
