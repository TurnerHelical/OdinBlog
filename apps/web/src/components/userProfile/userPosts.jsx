import {useLoaderData, useRouteLoaderData, Link} from 'react-router';


const UserPosts = () => {
    const posts = useLoaderData();
    const profileData = useRouteLoaderData('profileRoot');
    return (
        <>
            <Link to={`/user/${profileData.id}`}>Back</Link>
            <h2>{profileData.displayname}'s Posts</h2>
            <div>
                
                <div>
                    {posts.map(post => (
                        <Link to={`/blog/${post.id}`} key={post.id}>
                            <h4>{post.title}</h4>
                            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export {UserPosts};