import App from "./App";
import Home from "./components/layout/home";
import {root} from './loaders/rootLoader';
import {Auth} from './components/auth/authPage';
import {DashBase} from './components/dash/dashBase';
import {authAction} from './actions/authActions';
import {homeLoader} from './loaders/homeLoader';
import {dashLoader} from './loaders/dashLoader';

const routes = [
    {
        path:'/',
        element: <App />,
        loader: root,
        id: 'root',
        children: [
            {index: true, element: <Home />, loader: homeLoader },
            {path: 'auth', element: <Auth/>, action: authAction},
            {path: 'dash', element: <DashBase/>, loader: dashLoader},
            
            
        ]
    },
];

export default routes;