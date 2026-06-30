import {useLoaderData, Form, useActionData, useNavigation} from 'react-router';
import {useFormValidation} from '../../hooks/useFormValidation';
import {validatePost} from '../dash/dashCreate';
import {useState} from 'react';
import '../../styles/dashboard/dashCreate.css';

const PostUpdate = () => {
    const data = useLoaderData();
    const [dangerZone, setDangerZone] = useState(false);
    const actionData = useActionData();
    const navigation = useNavigation();
    const postForm = useFormValidation({
        title: data.title, 
        text: data.text},
        validatePost
    );
    const isSubmitting = navigation.state !== 'idle';
    const postServerError = actionData?.message;
    return (
        <>
            <Form id='postForm' action={`/dash/editPost/${data.id}`} method='patch' onSubmit={postForm.handleSubmit}>
                <h2>Edit Post</h2>
                {postServerError && <p>{postServerError}</p>}
                <input name='title' 
                    id='title' 
                    defaultValue={data.title}
                    onChange={postForm.handleChange}
                    onBlur={postForm.handleBlur}
                />
                {postForm.touched.title && postForm.errors.title && (
                    <p>{postForm.errors.title}</p>
                )}
                <textarea 
                name='text' 
                id='text' 
                defaultValue={data.text}
                onChange={postForm.handleChange}
                onBlur={postForm.handleBlur}/>
                {postForm.touched.text && postForm.errors.text && (
                    <p>{postForm.errors.text}</p>
                )}
                {data.published ? (
                    <div>
                        <p>Would you like to take this post down?</p>
                        <input type='radio' name='unpublish' value='true' id='unpublishTrue'></input>
                        <label htmlFor='publishTrue'>Yes</label>
                        <input type='radio' name='unpublish' value='false' id='unpublishFalse' defaultChecked></input>
                        <label htmlFor='publishFalse'>No</label>
                    </div>
                ) 
                :(
                    <div>
                        <p>Would you like to publish this blog post?</p>
                        <input type='radio' name='publish' value='true' id='publishTrue'></input>
                        <label htmlFor='publishTrue'>Yes</label>
                        <input type='radio' name='publish' value='false' id='publishFalse' defaultChecked></input>
                        <label htmlFor='publishFalse'>No</label>
                    </div>
                )}
                <button id='postSubmit' type='submit' name='intent' value='edit' disabled={isSubmitting} >{isSubmitting ? 'Creating...' : 'Submit'}</button> 
            </Form>
            <div id='dangerBox'>
                <button className='dangerBtn' onClick={() => setDangerZone(previous => !previous)}>DANGER ZONE</button>
                {!dangerZone 
                ? ('')
                :(<Form action={`/dash/editPost/${data.id}`} method='delete'>
                    <button className='dangerBtn confirmDelete' type='submit' name='intent' value='delete'>Delete this post</button>
                </Form>)}
            </div>
        </>
    )
}

export {PostUpdate};