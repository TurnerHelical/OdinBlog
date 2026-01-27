import App from "./App";
import Home from "./components/home";
import { homeLoader } from "./loaders/homeLoader";


const routes = [
    {
        path:'/',
        element: <App />,
        children: [
            {index: true, element: <Home />, loader: homeLoader,},
        ]
    },
];

export default routes;