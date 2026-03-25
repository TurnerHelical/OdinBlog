import {useLoaderData, Link} from 'react-router';

const UserProfile = () => {
    const user = useLoaderData();
    
    return (
        <>
            <div>
                <h2>{user.displayname}'s Profile</h2>
                <div>
                    <p>{user.bio}</p>
                </div>

                <div>
                    <h3>{user.displayname}'s Posts</h3>
                        <div>
                            {user.posts.map(post => (
                                <Link to={`blog/${post.id}`}>
                                    <h4>{post.title}</h4>
                                    <p>{post.publishedAt}</p>
                                </Link>
                            ))}
                        </div>
                        <Link>More Posts</Link>
                </div>

                <div>
                    <h3>{user.displayname}'s Comments</h3>
                    <div>
                        {user.comments.map(comment => (
                            <Link to={`/blog/${comment.postId}`}>
                                <p>{comment.text}</p>
                                <p>{comment.upDatedAt ?? comment.publishedAt}</p>
                            </Link>
                        ))}
                        <Link>More Comments</Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export {UserProfile};