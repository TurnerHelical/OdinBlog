import App from "./App";
import Home from "./components/home";
import Profile from './components/profile'
import { homeLoader } from "./loaders/homeLoader";
import { authAction } from './actions/authAction';


const routes = [
    {
        path:'/',
        element: <App />,
        children: [
            {index: true, element: <Home />, loader: homeLoader, action: authAction},
            {path:'profile', element: <Profile />},
        ]
    },
];

export default routes;