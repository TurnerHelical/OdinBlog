import {useLoaderData, Link, Form, useNavigation, useRouteLoaderData} from 'react-router';
import {useEffect, useState, useRef} from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import '../../styles/blogPost.css'

const validateComment = (values) => {
    const newErrors = {text: ''};

    if (!values.text.trim()) {
        newErrors.text = 'Comment can"t be empty';
    } else if (values.text.length > 500) {
        newErrors.text = 'Comments must be 500 characters or less';
    }
    return newErrors;
}

const BlogPage = () => {
    const post = useLoaderData();
    const navigation = useNavigation();
    const rootData = useRouteLoaderData('root')
    const [commentOpen, setCommentOpen] = useState(false);
    const wasSubmittingRef = useRef(false);
    const user = rootData.user?.user;

    const commentForm = useFormValidation(
        {text:''},
        validateComment
    );

    

    useEffect(() => {
        if (navigation.state === 'submitting') {
            wasSubmittingRef.current = true;
        }

        if (wasSubmittingRef.current && navigation.state === 'idle') {
            commentForm.resetForm();
            wasSubmittingRef.current = false;
        }
    }, [navigation.state]); 

    return (
        <>
            <div className='blogPage'>
                <div className='blogTitle'>
                    <h2>{post.title}</h2>
                    <h4>By {post.user?.displayname ? post.user.displayname : 'Account Deleted'}</h4>
                    <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                </div>
                
                <div className='postBox'>
                    <p className='postContent'>{post.text}</p>
                </div>

                <div className='commentBox'>
                    <h3>Comments</h3>
                    <button className='btn btn-primary commentBtn' onClick={() => setCommentOpen(previous => !previous)}>{(commentOpen ? 'Close comment box' : 'New comment')}</button>
                    {commentOpen ?
                    (<div className='newComment'>
                        {!user ? (<p>Please login before commenting!</p>)
                        :<Form className='commentForm' action={`/blog/${post.id}`} method='post' onSubmit={commentForm.handleSubmit}>
                            <textarea name='text' id='text' placeholder='Enter Comment Text' value={commentForm.values.text} onChange={commentForm.handleChange} onBlur={commentForm.handleBlur}/>
                            <p>{commentForm.values.text.length}/500</p>
                            <input type='hidden' name='postId' value={post.id}></input>
                            <button className='btn btn-primary' type='submit' disabled={navigation.state !== 'idle'}>{navigation.state === 'submitting' ? 'Posting....' : 'Post Comment'}</button>
                            {commentForm.touched.text && commentForm.errors.text && (
                            <p>{commentForm.errors.text}</p>
                        )}
                        </Form>}
                        
                    </div>)
                    : ('')
                    }
                    
                    {post.comments.length > 0 
                    ? ( post.comments.map(comment => (
                        <div key={comment.id} className='blogCommentCard'>
                            {comment.user 
                            ? <><Link className='blogCommentText commentUser' to={`/user/${comment.user.id}`}>{comment.user.displayname}</Link>
                                <p className='blogCommentText'>{comment.text}</p>
                                </>
                            : <><p className='blogCommentText commentUser'>Account Deleted</p>
                                <p className='blogCommentText'>{comment.text}</p> </>}
                            {user?.id === comment.user?.id 
                            ? (<Link to={`/dash/editComment/${comment.id}`} className='editComment'>Edit Comment</Link>)
                            : ('')
                            }
                        </div>
                    )))
                    : (<div>
                        <p>No Comments yet. Be the first!</p>
                    </div>)}

                </div>

            </div>
            
        </>
    )
}

export {BlogPage, validateComment};