import {useLoaderData, Link} from 'react-router';

const DashComments = () => {
    const data = useLoaderData();
    return (
        <>
            <div>
                <h2>My Comments</h2>
                {data.length > 0 
                    ? (data.map(comment => (
                        <div key={comment.id}>
                            <Link to={`/blog/${comment.postId}`}>
                                <p>{comment.text}</p>
                                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                                {comment.updatedAt 
                                    ? (new Date(comment.updatedAt).toLocaleDateString())
                                    : ('')
                                }
                            </Link>
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