import { CharacterInfo, PaginatedResponse } from './IApiResponse.ts';

export interface IStatus {
  isLoading: boolean;
  isStart: boolean;
  serverError: string | null;
}

export interface IResult {
  paginationData?: PaginatedResponse<CharacterInfo> | null;
  statusData: IStatus;
}
