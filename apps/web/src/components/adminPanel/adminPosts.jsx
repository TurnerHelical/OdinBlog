import {useLoaderData, Link, Form} from 'react-router';

const AdminPosts = () => {
    const posts = useLoaderData();
    return (
        <>
            <div>
                {posts.map(post => (
                    <div key={post.id}>
                        <ul>
                            <li><Link to={`/blog/${post.id}`} target='_blank' rel='noopener noreferer'>{post.title}</Link></li>
                            <li>{post.user ? <Link to={`/user/${post.user.id}`} target='_blank' rel='noopener noreferer'>{post.user.displayname}</Link> : 'User Deleted'}</li>
                            <li>{new Date(post.publishedAt).toLocaleDateString()}</li>
                            <li>
                                <Form action='/adminPanel/posts' method='post'>
                                    <input type='hidden' name='postId' value={post.id}/>
                                    <button type='submit' name='intent' value='delete'>Delete this post</button>
                                </Form>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export {AdminPosts}