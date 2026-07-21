import {Form, useLoaderData, useNavigation, useActionData} from 'react-router';
import {useState} from 'react';
import {validateComment} from '../blogPost/blogPage';
import { useFormValidation } from '../../hooks/useFormValidation';
import '../../styles/dashboard/dashCommentEdit.css';

const UpdateComment = () => {
    const data = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();
    const [dangerZone, setDangerZone] = useState(false);
    const commentForm = useFormValidation({
        text: actionData?.values.text ?? data.text},
    validateComment
    );
   
    const isSubmitting = navigation.state !== 'idle';
    const commentServerError = actionData?.message;
    

    return (
        <>
            <Form action={`/dash/editComment/${data.id}`} method='patch' id='editForm'>
                <label>Edit Comment:</label>
                {commentServerError && <p>{commentServerError}</p>}
                <textarea 
                    name='commentText' 
                    id='commentText' 
                    defaultValue={data.text}
                    onChange={commentForm.handleChange}
                    onBlur={commentForm.handleBlur} />
                    {commentForm.touched.text && commentForm.errors.text && (
                        <p>{commentForm.errors.text}</p>
                    )}
                <div className='dates'>
                    <p>Created at: {new Date(data.createdAt).toLocaleDateString()}</p>
                    {!data.updatedAt
                    ? ('')
                    :(<p> Last updated at: {new Date(data.updatedAt).toLocaleDateString()}</p>)}
                </div>
                <button className='updateBtn' type='submit' name='intent' value='edit' disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update'}</button>   
                
                       
            </Form>
            <div id='dangerBox'>
                <button className='dangerBtn' onClick={() => setDangerZone(previous => !previous)}>DANGER ZONE</button>

                {!dangerZone 
                ? ('')
                :(
                <Form action={`/dash/editComment/${data.id}`} method='delete'>
                    <button type='submit' className='dangerBtn confirmDelete' name='intent' value='delete' disabled={isSubmitting}>{isSubmitting ? 'Deleting...' : 'Delete'}</button>
                </Form>)}
            </div>
        
        </>
    )
}

export {UpdateComment};