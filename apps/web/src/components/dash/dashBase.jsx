import {useLoaderData} from 'react-router';

const DashBase = () => {
    const data = useLoaderData();
    
return (


    <>
        <h2>This is my dash {data.displayname}</h2>
        <div>
            <h3>My Bio</h3>
                <div>
                    <p>{data.bio}</p>
                </div>
        </div>
            <div>
                <h3>My Posts</h3>
                <ul>
                    {!data.posts.length > 0 
                    ? (<p>No posts yet</p>)                  
                    
                    : (data.posts.map((post) => {
                        <li key={post.id}>{post.title} {post.publishedAt}</li>
                    }))}
                </ul>
            </div>

            <div>
                <h3>My Comments</h3>
                <ul>
                    {!data.comments.length > 0 
                    ? (<p>No comments yet</p>)                  
                    
                    : (data.comments.map((comment) => {
                        <li key={comment.id}>{comment.text} {comment.createdAt} {comment.updatedAt}</li>
                    }))}
                </ul>
            </div>
    </>
    )
}

export {DashBase};