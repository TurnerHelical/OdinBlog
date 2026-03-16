import {useLoaderData, Link} from 'react-router';

const DashProfile = () => {
    const data = useLoaderData();
    const profile = data.profile;
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
                <div>
                    {!profile.comments.length > 0 
                    ? ( <div>
                        <p>No comments yet</p>               
                        </div>)
                    : (profile.comments.map((comment) => (
                        < div key={comment.id}>
                            <p>{comment.text} {new Date(comment.createdAt).toLocaleDateString()} {comment.updatedAt !== null ? (`${(new Date(comment.updatedAt).toLocaleDateString())}`):('')}</p>
                        </div>
                    )))}
                </div>
            </div>
    </>
    )
}

export {DashProfile};