import { CharacterInfo, PageInfo } from '../../src/domain/IApiResponse';
import { IResult } from '../../src/domain/IResults';

export const pageInfo: PageInfo = {
  next: 'https://swapi.dev/api/people/?page=2',
  previous: null,
  totalPages: 9,
};

export const characterResult: IResult<CharacterInfo> = {
  responseData: {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
  statusData: {
    isLoading: false,
    isStart: false,
    serverError: null,
  },
};

export const characterInfo: CharacterInfo = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};
