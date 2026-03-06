import App from "./App";
import Home from "./components/layout/home";
import {root} from './loaders/rootLoader';
import {Auth} from './components/auth/authPage';
import {DashProfile} from './components/dash/dashProfile';
import {DashRoot} from './components/dash/dashRoot';
import {authAction} from './actions/authActions';
import {homeLoader} from './loaders/homeLoader';
import {dashLoader} from './loaders/dashLoaders/dashLoader';
import {dashProfileLoader} from './loaders/dashLoaders/dashProfileLoader';

const routes = [
    {
        path:'/',
        element: <App />,
        loader: root,
        id: 'root',
        children: [
            {index: true, element: <Home />, loader: homeLoader },
            {path: 'auth', element: <Auth/>, action: authAction},
            {path: 'dash', 
            element: <DashRoot/>,
            id:'dashRoot',
            loader: dashLoader, children: [
                {path: 'profile', element: <DashProfile/>, loader: dashProfileLoader}


            ]},
            
            
        ]
    },
];

export default routes;