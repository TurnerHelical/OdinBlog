import {useLoaderData, Link} from 'react-router';

const DashPosts = () => {
    const data = useLoaderData();
    return (
        <>
            <div>
                <h2>My Posts</h2>
                {data.length > 0 
                ?(data.map(post => (
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
        </>
    )
}

export {DashPosts};