import {Outlet} from 'react-router';

const DashRoot = () => {
    return (

        <>
            <div>
                <ul>
                    <li>Profile</li>
                    <li>Create Post</li>
                    <li>My Posts</li>
                    <li>My Drafts</li>
                    <li>My Comments</li>
                    <li>Settings</li>
                </ul>
            </div>
            <div>
                <Outlet/>
            </div>
        
        
        
        </>

    )
}

export {DashRoot};