import {
    Link,
    useRouteLoaderData,
    useRevalidator,
    useNavigate
} from 'react-router';

import { api, setAccessToken } from '../../helpers/apiHelper';
import '../../styles/header.css';

const Header = () => {
    const rootData = useRouteLoaderData('root');
    const revalidator = useRevalidator();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await api({
                url: '/auth/logout',
                options: {
                    method: 'POST',
                },
            });

            setAccessToken(null);

            navigate('/auth', { replace: true });
            revalidator.revalidate();

        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <>
            <div id='headerContainer'>
                <h1>
                    <Link to='/'>Odin Blog</Link>
                </h1>

                <div>
                    {rootData.user?.user
                        ? (
                            <div id='userHeader'>
                                <Link
                                    to='/dash'
                                    id='headerDash'
                                >
                                    {rootData.user.user.displayname}
                                </Link>

                                <button
                                    type='button'
                                    id='headerAuth'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )
                        : (
                            <Link to='/auth'>
                                Login / Signup
                            </Link>
                        )
                    }
                </div>
            </div>

            <nav id='mainNav'>
                <Link to='/'>Home</Link>

                {rootData.user?.user && (
                    <Link to='/dash'>Dashboard</Link>
                )}

                {rootData.user?.user?.isAdmin && (
                    <Link to='/adminPanel'>Admin Panel</Link>
                )}
            </nav>
        </>
    );
};

export default Header;