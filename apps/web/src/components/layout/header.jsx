import {Link} from 'react-router';

const Header = () => {
    return (
        <>
            <h1>Title Header</h1>
            <div>
                There will be a link here that will either bring the user to the login/register page or if already logged in will show displayname and a logout button
            </div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/dash'>Dashboard</Link>
                <Link to='/about'>About</Link>
            </nav>
        </>
    )
}

export default Header;