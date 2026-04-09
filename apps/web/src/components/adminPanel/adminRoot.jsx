import {useLoaderData, Outlet, Link} from 'react-router';

const AdminRoot = () => {
    const data = useLoaderData();
    return (
        <>
            <div>
                <div>
                    <Link to='/adminPanel'>User Panel</Link>
                    <Link to='/adminPanel/posts'>Post Panel</Link>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export {AdminRoot};