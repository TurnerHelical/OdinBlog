import '../../styles/dashboard/dashRoot.css'
import {Outlet, Link, useLoaderData} from 'react-router';


const DashRoot = () => {
    const data = useLoaderData();
    
    
    
    return (

        <div className='rootBox'>
            <aside>
                
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
                
            </aside>
            <div className='dashContent'>
                <h2>{data.displayname}'s Dash</h2>
                <Outlet/>
            </div>
        
        
        
        </div>

    )
}

export {DashRoot};