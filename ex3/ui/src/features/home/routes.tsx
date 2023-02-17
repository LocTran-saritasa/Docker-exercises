import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/authGuard';

const HomePage = lazy(() => import('./pages').then(module => ({ default: module.HomePage })));

export const homeRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
];
