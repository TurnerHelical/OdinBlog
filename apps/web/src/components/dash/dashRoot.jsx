import {Outlet, Link} from 'react-router';

const DashRoot = () => {
    return (

        <>
            <div>
                
                    <Link to='/dash/profile'>Profile</Link>
                    <Link to='/dash/newPost'>Create Post</Link>
                    <Link to='/dash/posts'>My Posts</Link>
                    <Link to='/dash/drafts'>My Drafts</Link>
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