import {useState} from "react";
import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import WallpapersPage from './pages/WallpapersPage';
import LoginPage from './pages/LoginPage';


// ----------------------------------------------------------------------

export default function Router() {
    const [route, setRoute] = useState([]);
    const routes = useRoutes([
        {
            path: '/wallpapers',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/wallpapers/all"/>, index: true},
                {path: 'all', element: <WallpapersPage pName={'All Wallpapers'}/>},
                {path: 'footballers', element: <WallpapersPage pName={'Footballer Wallpapers'}/>},
                {path: 'cricketers', element: <WallpapersPage pName={'Cricketer Wallpapers'}/>},
                {path: 'actors', element: <WallpapersPage pName={'Actors Wallpapers'}/>},
            ],
        },
        {
            path: 'login',
            element: <LoginPage/>,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);

    return routes;
}
