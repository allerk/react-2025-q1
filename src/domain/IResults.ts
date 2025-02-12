export interface IStatus {
  isLoading: boolean;
  isStart: boolean;
  serverError: string | null;
}

export interface IResult<T> {
  responseData?: T | null;
  statusData: IStatus;
}
