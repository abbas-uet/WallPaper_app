import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/wallpapers',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/wallpapers/all" />, index: true },
        { path: 'all', element: <BlogPage pName={'All Wallpapers'} /> },
        { path: 'footballers', element: <BlogPage pName={'Footballer Wallpapers'} /> },
        { path: 'cricketers', element: <BlogPage pName={'Cricketer Wallpapers'} /> },
        { path: 'actors', element: <BlogPage pName={'Actors Wallpapers'} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
