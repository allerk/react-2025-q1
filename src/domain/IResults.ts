export interface IStatus {
  isLoading: boolean;
  isStart: boolean;
  serverError: string | null;
}

export interface IResult<T> {
  paginationData?: T | null;
  statusData: IStatus;
}
