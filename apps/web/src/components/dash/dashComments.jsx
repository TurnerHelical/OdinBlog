import {useLoaderData, Link} from 'react-router';

const DashComments = () => {
    const data = useLoaderData();
    return (
        <>
            <div>
                <h2>My Comments</h2>
                {data.items.length > 0 
                    ? (data.items.map(comment => (
                        <div key={comment.id}>
                            <Link to={`/blog/${comment.postId}`}>
                                <p>{comment.text}</p>
                                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                                {comment.updatedAt 
                                    ? (<p>{new Date(comment.updatedAt).toLocaleDateString()}</p>)
                                    : ('')
                                }
                            </Link>
                            <Link to={`/dash/editComment/${comment.id}`}>Edit Comment</Link>
                        </div>
                    ))
                        
                    )
                    :(<div>
                        <p>No comments yet! Go do it!</p>
                    </div>)
                    }

            </div>
        
        </>
    )
}

export {DashComments};