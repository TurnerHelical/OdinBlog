import { useOutletContext } from "react-router";


export default function DashHome() {
    const user = useOutletContext();
    const {displayname, canPost, isAdmin, bio, posts = [], comments = []} = user;
    return (
        <>
                <h1>{displayname}'s Profile</h1>
                <div>
                    <h2>About</h2>
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
            </>    
            )

                
            
        
}