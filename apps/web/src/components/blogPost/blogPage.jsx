import {useLoaderData, Link, Form, useNavigation} from 'react-router';
import {useEffect, useState, useRef} from 'react';

const BlogPage = () => {
    const post = useLoaderData();
    const navigation = useNavigation();
    const [commentOpen, setCommentOpen] = useState(false);
    const [commentText, setCommentText] = useState('');
    const wasSubmittingRef = useRef(false);

    useEffect(() => {
        if (navigation.state === 'submitting') {
            wasSubmittingRef.current = true;
        }

        if (wasSubmittingRef.current && navigation.state === 'idle') {
            setCommentText('');
            wasSubmittingRef.current = false;
        }
    }, [navigation.state]); 

    return (
        <>
            <h2>{post.title}</h2>
            <h4>By {post.user.displayname}</h4>
            <div>
                <p>{post.text}</p>
                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
            <div>
                <button onClick={() => setCommentOpen(previous => !previous)}>{(commentOpen ? 'Close comment box' : 'New comment')}</button>
                {commentOpen ?
                (<div>
                    <Form action={`/blog/${post.id}`} method='post'>
                        <textarea name='text' id='text' placeholder='Enter Comment Text' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                        <input type='hidden' name='postId' value={post.id}></input>
                        <button type='submit' disabled={navigation.state !== 'idle'}>{navigation.state === 'submitting' ? 'Posting....' : 'Post Comment'}</button>
                    </Form>
                </div>)
                : ('')
                }
            </div>
            <div>
                
                <h3>Comments</h3>
                {post.comments.length > 0 
                ? ( post.comments.map(comment => (
                    <div key={comment.id}>
                        <Link to={`/user/${comment.user.id}`}>{comment.user.displayname}</Link>
                        <p>{comment.text}</p>
                    </div>
                )))
                : (<div>
                    <p>No Comments yet. Be the first!</p>
                </div>)}
                
                
                <div>

                </div>
            </div>
        </>
    )
}

export {BlogPage};