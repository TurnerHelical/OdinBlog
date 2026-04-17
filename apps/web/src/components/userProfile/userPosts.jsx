import {useLoaderData, useRouteLoaderData, Link} from 'react-router';
import {Pagination} from '../layout/pagination';

const UserPosts = () => {
    const data = useLoaderData();
    const profileData = useRouteLoaderData('profileRoot');
    return (
        <>
            <Link to={`/user/${profileData.id}`}>Back</Link>
            <h2>{profileData.displayname}'s Posts</h2>
            <div>
                
                <div>
                    {data.items.length > 0
                    ? (data.items.map(post => (
                        <Link to={`/blog/${post.id}`} key={post.id}>
                            <h4>{post.title}</h4>
                            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                        </Link>
                    )))
                    : (
                        <div>
                            <p>No posts yet</p>
                        </div>
                    )}
                </div>
            </div>
            <Pagination
                currentPage={data.pageNumber}
                totalPages={data.pages}
                url={`/user/${profileData.id}/posts`} />
        </>
    )
}

export {UserPosts};