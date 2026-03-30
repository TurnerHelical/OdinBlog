import {Link, useRouteLoaderData} from 'react-router';

const Header = () => {
    const rootData = useRouteLoaderData('root');    
    return (
        <>
            <h1>Title Header</h1>
            <div>
                {rootData.user?.user 
                ? (<>
                    <Link to='/dash'>Logged in as: {rootData.user.user.displayname}</Link>
                    <Link to='/auth'>Logout</Link>
                    </>
                )
                : (<Link to='/auth'>Login / Signup</Link>)}
            </div>
            <nav>
                <Link to='/'>Home</Link>
                {rootData.user?.user && (<Link to='/dash'>Dashboard</Link>)}
                {rootData.user?.user?.isAdmin && (<Link to='/admin'>Admin Panel</Link>)}

            </nav>
        </>
    )
}

export default Header;