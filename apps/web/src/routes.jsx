import App from "./App";
import Home from "./components/layout/home";
import DashboardLayout from './components/dash/dashboard';
import DashHome from './components/dash/dashHome';
import DashCreate from './components/dash/dashCreate';
import { homeLoader } from "./loaders/homeLoader";
import {authAction} from './actions/authAction';
import {dashLoader} from './loaders/dashLoader';
import {rootLoader} from './loaders/rootLoader';


const routes = [
    {
        path:'/',
        element: <App />,
        loader: rootLoader,
        children: [
            {index: true, element: <Home />, loader: homeLoader, action: authAction},
            {path:'dashboard', element: <DashboardLayout />, loader: dashLoader, children: [
                {index: true, element: <DashHome />},
                {path:'dashboard/create-draft', element: <DashCreate />}
            ]},
            
        ]
    },
];

export default routes;