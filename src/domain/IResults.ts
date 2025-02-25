export interface IStatus {
  isLoading: boolean;
  serverError: string | null;
}

export interface IResult<T> {
  responseData?: T | null;
  statusData: IStatus;
}
