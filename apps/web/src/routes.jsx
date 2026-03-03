import App from "./App";
import Home from "./components/layout/home";
import {root} from './loaders/rootLoader';
import {Auth} from './components/auth/authPage';
import {authAction} from './actions/authActions';
import {homeLoader} from './loaders/homeLoader';

const routes = [
    {
        path:'/',
        element: <App />,
        loader: root,
        children: [
            {index: true, element: <Home />, loader: homeLoader },
            {path: 'auth', element: <Auth/>, action: authAction},
            
            
        ]
    },
];

export default routes;