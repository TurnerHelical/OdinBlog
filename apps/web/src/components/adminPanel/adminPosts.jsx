import {useLoaderData, Link, Form} from 'react-router';
import {Pagination} from '../layout/pagination';

const AdminPosts = () => {
    const data = useLoaderData();
    return (
        <>
            <div>
                {data.items.map(post => (
                    <div key={post.id}>
                        <ul>
                            <li><Link to={`/blog/${post.id}`} target='_blank' rel='noopener noreferer'>{post.title}</Link></li>
                            <li>{post.user ? <Link to={`/user/${post.user.id}`} target='_blank' rel='noopener noreferer'>{post.user.displayname}</Link> : 'User Deleted'}</li>
                            <li>{new Date(post.publishedAt).toLocaleDateString()}</li>
                            <li>
                                <Form action='/adminPanel/posts' method='post'>
                                    <input type='hidden' name='postId' value={post.id}/>
                                    <button type='submit' name='intent' value='deletePost'>Delete this post</button>
                                </Form>
                            </li>
                        </ul>
                    </div>
                ))}
                <Pagination
                    currentPage={data.pageNumber}
                    totalPages={data.pages}
                    url='/adminPanel/posts'
                    />
            </div>

        </>
    )
}

export {AdminPosts}