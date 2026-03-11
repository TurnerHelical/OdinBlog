import App from "./App";
import Home from "./components/layout/home";
import {root} from './loaders/rootLoader';
import {Auth} from './components/auth/authPage';
import {DashProfile} from './components/dash/dashProfile';
import {DashRoot} from './components/dash/dashRoot';
import {DashCreate} from './components/dash/dashCreate';
import {DashDrafts} from './components/dash/dashDrafts';
import {DashPosts} from './components/dash/dashPosts';
import {BlogPage} from './components/blogPost/blogPage';
import {postCreate} from './actions/dashActions/dashCreateAction';
import {authAction} from './actions/authActions';
import {postEdit} from './actions/dashActions/postEdit';
import {homeLoader} from './loaders/homeLoader';
import {dashLoader} from './loaders/dashLoaders/dashLoader';
import {dashProfileLoader} from './loaders/dashLoaders/dashProfileLoader';
import {draftLoader} from './loaders/dashLoaders/dashDraftLoader';
import {editLoader} from './loaders/dashLoaders/postEditLoader';
import {myPostLoader} from './loaders/dashLoaders/dashPostLoader';
import {blogPostLoader} from './loaders/blogPostLoader';
import { PostUpdate } from "./components/dash/dashPostUpdate";
import { blogPageAction } from "./actions/blogPageAction";

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
                {index:true, element: <DashProfile/>, loader: dashProfileLoader},
                {path: 'create', element: <DashCreate />, action: postCreate},
                {path: 'drafts', element: <DashDrafts />, loader: draftLoader},
                {path: 'editPost/:postId', element: <PostUpdate/>, loader: editLoader, action: postEdit}, 
                {path: 'posts', element: <DashPosts />, loader: myPostLoader},
            ]},
            {path: 'blog/:postId', element: <BlogPage/>, loader: blogPostLoader, action: blogPageAction},
            
            
        ]
    },
];

export default routes;