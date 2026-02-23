import App from "./App";
import Home from "./components/layout/home";
import {root} from './loaders/rootLoader'



const routes = [
    {
        path:'/',
        element: <App />,
        children: [
            {index: true, element: <Home />, loader: root},
            
            
        ]
    },
];

export default routes;