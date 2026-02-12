import {useLoaderData} from 'react-router';

const Profile = () => {
    const {profile, isMe} = useLoaderData();
    const {user} = profile;
    const {displayname, canPost, isAdmin, bio, posts = [], comments = []} = user;
    return (
        <>
        <h1>User {displayname}</h1>
        {isMe ? (
            <>
            <div>
                <button>Edit Profile</button>
                <button>View public profile</button>
            </div>

            <aside>
                <nav>
                    <h3>Menu</h3>
                    <ul>
                        <li>Profile</li>
                        {(canPost || isAdmin) && (
                            <>
                            <li>Create Draft</li>
                            <li>My Drafts</li>
                            <li>Published Posts</li>
                            </>
                        )}
                        
                        <li>My Comments</li>
                    </ul>
                </nav>
            </aside>
            </>
        ): (<>
        </>)}
            <main>
                <div>
                    <h2>About Me</h2>
                    <div>
                        {bio}
                    </div>
                </div>

                <div>
                    <h2>Posts by {displayname}</h2>
                    <div>
                        {posts.length < 1 ? (
                            <p>No Posts Yet!</p>
                        ):
                        (posts.map((post) => (
                            <div key={post.id}>
                            {post.title} {new Date(post.publishedAt).toLocaleDateString()}
                            </div>
                    
                        )))}
                    </div>
                </div>

                <div>
                    <h2> Comments by {displayname}</h2>
                    <div>
                        {comments.length < 1 ? (
                            <p>No Comments Yet!</p>
                        ):
                        (comments.map((comment) => (
                            <div key={comment.id}>
                                {comment.text} {new Date(comment.createdAt).toLocaleDateString()}
                            </div>    
                        )))}

                    </div>
                </div>
                
            </main>
        </>
    )
}

export default Profile;