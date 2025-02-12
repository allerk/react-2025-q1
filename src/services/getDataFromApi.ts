import { API_URL, DEFAULT_PAGE } from '../constants/constants.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { QueryParameters } from '../common/enums/query-parameters.ts';
import httpClient from './httpClient.ts';

const getDataFromApi = async <T>(
  searchTerm?: string | null,
  page?: string | null,
  prevSearch?: string | null
): Promise<T | null> => {
  try {
    const params = new URLSearchParams({
      page: page ? page : DEFAULT_PAGE.toString(),
    });

    if (searchTerm !== prevSearch) {
      params.delete(QueryParameters.PAGE);
      params.set(QueryParameters.PAGE, DEFAULT_PAGE.toString());
    }

    if (searchTerm) {
      params.append('search', searchTerm);
    }

    const apiUrl = `${API_URL}?${params}`;

    return await httpClient(apiUrl);
  } catch (e) {
    const error = e as AxiosError;
    const response: AxiosResponse | undefined = error.response;
    if (response && response.status >= 400) {
      const error: string = `Star Wars API server failed. With status code ${response.status}`;
      throw new AxiosError(error);
    }
    return null;
  }
};

export default getDataFromApi;
