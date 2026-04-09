import {useLoaderData, Outlet, Link} from 'react-router';

const AdminRoot = () => {
    const data = useLoaderData();
    return (
        <>
            <div>
                <div>
                    <Link to='/adminPanel'>User Panel</Link>
                    {/* <Link>Post/Comment Panel</Link> */}
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export {AdminRoot};