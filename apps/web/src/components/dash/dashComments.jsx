import {useLoaderData, Link} from 'react-router';
import '../../styles/dashboard/dashComments.css';
const DashComments = () => {
    const data = useLoaderData();
    return (
        <>
            <div className='commentCtr'>
                <h2>My Comments</h2>
                
                {data.items.length > 0 
                    ? (data.items.map(comment => (
                        <div key={comment.id} className='commentCard'>
                            <Link to={`/blog/${comment.postId}`} className='postLink'>
                                <p className='commentText'>{comment.text}</p>
                            </Link>
                            <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                            <Link to={`/dash/editComment/${comment.id}`} className='editComment'>Edit</Link>
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