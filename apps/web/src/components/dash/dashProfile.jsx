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
                <h3>Recent Posts</h3>
                
                    {!profile.posts.length > 0 
                    ? (<div><p>No posts yet</p></div>)                  
                    
                    : (profile.posts.map((post) => (
                        <div key={post.id}>
                            <Link to={`/blog/${post.id}`} >{post.title} {new Date(post.publishedAt).toLocaleDateString()}</Link>
                        </div>
                    )))}
                
            </div>

            <div>
                <h3>Recent Comments</h3>
                
                    {!profile.comments.length > 0 
                    ? ( <div>
                        <p>No comments yet</p>               
                        </div>)
                    : (profile.comments.map((comment) => (
                        < div key={comment.id}>
                            <Link to={`/blog/${comment.postId}`}>{comment.text} {new Date(comment.createdAt).toLocaleDateString()} {comment.updatedAt !== null ? (`${(new Date(comment.updatedAt).toLocaleDateString())}`):('')}</Link>
                        </div>
                    )))}
                
            </div>
    </>
    )
}

export {DashProfile};