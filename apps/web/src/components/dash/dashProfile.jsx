import {useLoaderData} from 'react-router';

const DashProfile = () => {
    const data = useLoaderData();
    const profile = data.profile
return (


    <>
        <h2>This is my dash {profile.displayname}</h2>
        <div>
            <h3>My Bio</h3>
                <div>
                    <p>{profile.bio}</p>
                </div>
        </div>
            <div>
                <h3>My Posts</h3>
                <ul>
                    {!profile.posts.length > 0 
                    ? (<p>No posts yet</p>)                  
                    
                    : (profile.posts.map((post) => (
                        <li key={post.id}>{post.title} {new Date(post.publishedAt).toLocaleDateString()}</li>
                    )))}
                </ul>
            </div>

            <div>
                <h3>My Comments</h3>
                <ul>
                    {!profile.comments.length > 0 
                    ? (<p>No comments yet</p>)                  
                    
                    : (profile.comments.map((comment) => {
                        <li key={comment.id}>{comment.text} {comment.createdAt} {comment.updatedAt}</li>
                    }))}
                </ul>
            </div>
    </>
    )
}

export {DashProfile};