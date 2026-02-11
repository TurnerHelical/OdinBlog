import App from "./App";
import Home from "./components/home";
import Profile from './components/profile'
import { homeLoader } from "./loaders/homeLoader";
import {authAction} from './actions/authAction';
import {profileLoader} from './loaders/profileLoader';
import {rootLoader} from './loaders/rootLoader';


const routes = [
    {
        path:'/',
        element: <App />,
        loader: rootLoader,
        children: [
            {index: true, element: <Home />, loader: homeLoader, action: authAction},
            {path:'profile', element: <Profile />, loader: profileLoader}
        ]
    },
];

export default routes;