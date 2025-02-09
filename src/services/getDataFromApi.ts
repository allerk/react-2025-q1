import axios from 'axios';
import { CharacterInfo, PaginatedResponse } from '../domain/IApiResponse.ts';
import { API_URL, DEFAULT_PAGE } from '../constants/constants.ts';

export const getDataFromApi = async (
  searchTerm?: string,
  page?: string
): Promise<PaginatedResponse<CharacterInfo>> => {
  const params = new URLSearchParams({
    page: page ? page : DEFAULT_PAGE.toString(),
  });

  if (searchTerm) {
    params.append('search', searchTerm);
  }

  const apiUrl = `${API_URL}?${params}`;

  const config = {
    method: 'get',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response.data as PaginatedResponse<CharacterInfo>;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default getDataFromApi;
