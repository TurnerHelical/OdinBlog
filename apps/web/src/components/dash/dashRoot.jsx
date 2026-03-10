import {Outlet, Link, useRouteLoaderData} from 'react-router';

const DashRoot = () => {
    const rootData = useRouteLoaderData('root');
    const user = rootData.user.user;
    return (

        <>
            <div>
                
                    <Link to='/dash'>Profile</Link>
                    {user.canPost ? (
                        <>
                        <Link to='/dash/create'>Create Post</Link>
                        <Link to='/dash/posts'>My Posts</Link>
                        <Link to='/dash/drafts'>My Drafts</Link>
                        </>
                        )
                    :('')
                    }
                    
                    <Link to='/dash/comments'>My Comments</Link>
                    <Link to='/dash/settings'>Account Settings</Link>
                
            </div>
            <div>
                <Outlet/>
            </div>
        
        
        
        </>

    )
}

export {DashRoot};