import {useLoaderData} from 'react-router';

const Profile = () => {
    const {profile, isMe} = useLoaderData();
    console.log(profile);
    return (
        <>
        <h1>User {`${profile.user.displayname}`}</h1>
        {isMe ? (
            <>
                <button>Edit Profile</button>
                <button>View public profile</button>
            </>
        ): (<>
        </>)}
            <main>
                <div>
                    <h2>About Me</h2>
                    <div>
                        {`${profile.user.bio}`}
                    </div>
                </div>

                <div>
                    <h2>Posts by {`${profile.user.displayname}`}</h2>
                    <div>
                        {profile.user.posts.length <1 ? (
                            <p>No Posts Yet!</p>
                        ):
                        (profile.user.posts.map((post) => (
                            <div key={post.id}>
                            {post.title} {post.publishedAt}
                            </div>
                    
                        )))}
                    </div>
                </div>

                <div>
                    <h2> Comments by {`${profile.user.displayname}`}</h2>
                    <div>
                        {profile.user.comments.length < 1 ? (
                            <p>No Comments Yet!</p>
                        ):
                        (profile.user.comments.map((comment) => (
                            <div key={comment.id}>
                                {comment.text} {comment.createdAt}
                            </div>    
                        )))}

                    </div>
                </div>
                
            </main>
        </>
    )
}

export default Profile;