import axios from 'axios';

export const httpClient = async <T>(apiUrl: string): Promise<T> => {
  const config = {
    method: 'get',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response.data as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default httpClient;
