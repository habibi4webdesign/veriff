import { lazy } from 'react';
const HomePage = lazy(() => import('pages/Home/HomePage'));
const SuccessPage = lazy(() => import('pages/Success/SuccessPage'));


export const routes = [
  {
    component: HomePage,
    exact: true,
    path: '/',
  },
  {
    component: SuccessPage,
    exact: true,
    path: '/success',
  },
];
