import {Link, useRouteLoaderData} from 'react-router';
import '../../styles/header.css'

const Header = () => {
    const rootData = useRouteLoaderData('root');    
    return (
        <>
        <div id='headerContainer'>
            <h1><Link to='/'>Odin Blog</Link></h1>
            <div>
                {rootData.user?.user 
                ? (<div id='userHeader'>
                    <Link to='/dash' id='headerDash' >{rootData.user.user.displayname}</Link>
                    <Link to='/auth' id='headerAuth' >Logout</Link>
                    </div>
                )
                : (<Link to='/auth'>Login / Signup</Link>)}
            </div>
        </div> 
        <nav id='mainNav'>
                <Link to='/'>Home</Link>
                {rootData.user?.user && (<Link to='/dash'>Dashboard</Link>)}
                {rootData.user?.user?.isAdmin && (<Link to='/adminPanel'>Admin Panel</Link>)}

            </nav>
        </>
    )
}

export default Header;