import { API_URL, DEFAULT_PAGE } from '../constants/constants.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { QueryParameters } from '../common/enums/query-parameters.ts';
import httpClient from './httpClient.ts';

const getDataFromApi = async <T>(
  isDetails: boolean,
  value?: string | null,
  page?: string | null,
  prevValue?: string | null
): Promise<T | null> => {
  try {
    if (isDetails) {
      const apiUrl = `${API_URL}${value}`;
      return await httpClient(apiUrl);
    } else {
      const params = new URLSearchParams({
        page: page ? page : DEFAULT_PAGE.toString(),
      });

      if (value !== prevValue) {
        params.delete(QueryParameters.PAGE);
        params.set(QueryParameters.PAGE, DEFAULT_PAGE.toString());
      }

      if (value) {
        params.append('search', value);
      }
      const apiUrl = `${API_URL}?${params}`;

      return await httpClient(apiUrl);
    }
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
