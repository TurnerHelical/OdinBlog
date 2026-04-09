import {Outlet, Link, useLoaderData} from 'react-router';


const DashRoot = () => {
    const data = useLoaderData();
    
    
    
    return (

        <>
            <div>
                
                    <Link to='/dash'>Profile</Link>
                    {data.canPost ? (
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