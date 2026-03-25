import {useRouteLoaderData, Link} from 'react-router';

const UserProfile = () => {
    const user = useRouteLoaderData('profileRoot');
    return (
        <>
            <div>
                <h2>{user.displayname}'s Profile</h2>
                <div>
                    <p>{user.bio}</p>
                </div>

                <div>
                    <h3>{user.displayname}'s Posts</h3>
                    {user.posts.length > 0 
                       ? (
                       
                       <div>  
                            {user.posts.map(post => (
                                <Link to={`/blog/${post.id}`} key={post.id}>
                                    
                                    <h4>{post.title}</h4>
                                    <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                                </Link>
                            ))}
                            <Link to={`posts`}>More Posts</Link>
                        </div>)

                        : (<div>
                            <p>No Posts Yet!</p>
                        </div>)
                    }
                </div>

                <div>
                    <h3>{user.displayname}'s Comments</h3>
                    {user.comments.length > 0 
                    ? (<div>
                        {user.comments.map(comment => (
                            <Link to={`/blog/${comment.postId}`} key={comment.id}>
                                <p>{comment.text}</p>
                                <p>{comment.updatedAt ? new Date(comment.updatedAt).toLocaleDateString() : new Date(comment.createdAt).toLocaleDateString()}</p>
                            </Link>
                        ))}
                        <Link to={'comments'}>More Comments</Link>
                    </div>)

                    :(<div>
                        <p>No Comments Yet!</p>
                    </div>)
                    }
                </div>
    
            </div>
        </>
    )
}

export {UserProfile};