import App from "./App";
import Home from "./components/layout/home";
import {root} from './loaders/rootLoader';
import {Auth} from './components/auth/authPage';
import {DashProfile} from './components/dash/dashProfile';
import {DashRoot} from './components/dash/dashRoot';
import {DashCreate} from './components/dash/dashCreate';
import {DashDrafts} from './components/dash/dashDrafts';
import {DashPosts} from './components/dash/dashPosts';
import {DashComments} from './components/dash/dashComments';
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
import {commentLoader} from './loaders/dashLoaders/dashCommentLoader';
import {blogPostLoader} from './loaders/blogPostLoader';
import { PostUpdate } from "./components/dash/dashPostUpdate";
import {UpdateComment} from './components/dash/dashCommentUpdate';
import {commentUpdateLoader} from './loaders/dashLoaders/dashCommentUpdateLoader';
import { blogPageAction } from "./actions/blogPageAction";
import {commentUpdate} from './actions/dashActions/commentUpdate';
import {DashSettings} from './components/dash/dashSettings';
import {settingsLoader} from './loaders/dashLoaders/dashSettingsLoader';
import {settingsAction} from './actions/dashActions/settingsAction';
import {UserProfileRoot} from './components/userProfile/userProfileRoot';
import {UserProfile} from './components/userProfile/profile';
import {profileLoader} from './loaders/profileLoader';
import {UserPosts} from './components/userProfile/userPosts';
import {userPostLoader} from './loaders/userPostLoader';
import {UserComments} from './components/userProfile/userComments';
import { userCommentsLoader } from "./loaders/userCommentsLoader";

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
                {path: 'comments', element: <DashComments />, loader: commentLoader},
                {path:'editComment/:commentId', element: <UpdateComment />, loader:commentUpdateLoader, action: commentUpdate},
                {path: 'settings', element: <DashSettings />, loader: settingsLoader, action: settingsAction},
            ]},
            {path: 'blog/:postId', element: <BlogPage/>, loader: blogPostLoader, action: blogPageAction},
            {path: 'user/:userId', element: <UserProfileRoot />, loader: profileLoader, id: 'profileRoot', children: [
                {index: true, element:<UserProfile />},
                {path: '/user/:userId/posts', element: <UserPosts />, loader: userPostLoader},
                {path:'/user/:userId/comments', element: <UserComments />, loader: userCommentsLoader}
            ]},       
            
            
        ]
    },
];

export default routes;