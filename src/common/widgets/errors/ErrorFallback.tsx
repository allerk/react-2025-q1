import { ReactNode } from 'react';

interface IProps {
  message: string | null;
  children?: ReactNode;
}

const ErrorFallback = ({ message, children }: IProps) => {
  // TODO: It might be useful later, but task number 2 still requires to have ErrorBoundary like wrapping all in it. Not by using elementError on router
  // const routesError = useRouteError();
  // const [error, setError] = useState<string | null>(message);
  // useEffect(() => {
  //   console.log(routesError);
  //   if (routesError) {
  //     if (isRouteErrorResponse(routesError)) {
  //       console.log('isRouteErrorResponse');
  //       setError(routesError.statusText);
  //     } else if (routesError instanceof Error) {
  //       console.log('instanceof');
  //       setError(routesError.message);
  //     } else {
  //       console.log('null');
  //       setError(null);
  //     }
  //   }
  // }, [error, routesError]);

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-rows-[auto_auto]">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>Error message: {message}</p>
        {!!children && children}
      </div>
    </div>
  );
};

export default ErrorFallback;
