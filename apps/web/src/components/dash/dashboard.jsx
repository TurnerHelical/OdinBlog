import {useLoaderData, Outlet} from 'react-router';


const DashboardLayout = () => {
    const {user} = useLoaderData();
    
    return (
        <>
            <h1>My Dashboard</h1>
            

            <aside>
                <nav>
                    <h3>Menu</h3>
                    <ul>
                        <li>Profile</li>
                        {(user.canPost || user.isAdmin) && (
                            <>
                            <li>Create Draft</li>
                            <li>My Drafts</li>
                            <li>Published Posts</li>
                            </>
                        )}
                        
                        <li>My Comments</li>
                    </ul>
                </nav>
            </aside>

            <main>
                <Outlet context={user}/>
            </main>
            </>
        
    )
}

export default DashboardLayout;