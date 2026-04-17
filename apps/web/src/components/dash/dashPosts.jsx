import {useLoaderData, Link} from 'react-router';
import {Pagination} from '../layout/pagination';

const DashPosts = () => {
    const data = useLoaderData();
    return (
        <>
            <div>
                <h2>My Posts</h2>
                {data.items.length > 0 
                ?(data.items.map(post => (
                    <div key={post.id}>
                        
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        <Link to={`/dash/editPost/${post.id}`}>Edit Post</Link>
                    </div>
                )))
                :(<>
                <p>No Posts Yet!</p>
                </>)
                }
            </div>
            <Pagination
                currentPage={data.pageNumber}
                totalPages={data.pages}
                url={`/dash/posts`} />
        </>
    )
}

export {DashPosts};