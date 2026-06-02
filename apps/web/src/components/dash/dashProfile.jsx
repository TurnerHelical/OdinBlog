import {useLoaderData, Link} from 'react-router';
import '../../styles/dashboard/dashProfile.css'
const DashProfile = () => {
    const data = useLoaderData();
    const profile = data.profile;
return (


    <>
        
        <div className='bioCtr'>
            <h3>My Bio</h3>
                <div className='bio'>
                    <p>{profile.bio}</p>
                </div>
        </div>
            <div className='recentsCtr'>
                <h3>Recent Posts</h3>
                
                    {!profile.posts.length > 0 
                    ? (<div ><p className='recents'>No posts yet</p></div>)                  
                    
                    : (profile.posts.map((post) => (
                        
                            <Link key={post.id} className='recents' to={`/blog/${post.id}`} >
                                <p>{post.title} </p>
                                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                            </Link>
                        
                    )))}
                
            </div>

            <div className='recentsCtr'>
                <h3>Recent Comments</h3>
                
                    {!profile.comments.length > 0 
                    ? ( <div className='recents'>
                        <p>No comments yet</p>               
                        </div>)
                    : (profile.comments.map((comment) => (
                        
                            <Link className='recents' key={comment.id}to={`/blog/${comment.postId}`}>
                                <p>{comment.text}</p>
                                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                                <p>{comment.updatedAt !== null ? (`${(new Date(comment.updatedAt).toLocaleDateString())}`):('')}</p>
                            </Link>
                        
                    )))}
                
            </div>
    </>
    )
}

export {DashProfile};