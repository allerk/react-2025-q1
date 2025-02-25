import { createRoutesFromElements, Route, RouteObject } from 'react-router';
import App from '../App.tsx';
import Main from '../components/main/Main.tsx';
import Details from '../components/results/details/Details.tsx';
import NotFound from '../components/not-found/NotFound.tsx';

const routes: RouteObject[] = createRoutesFromElements(
  <Route element={<App />}>
    <Route path="" element={<Main />}>
      <Route path="" element={<Details />}></Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default routes;
