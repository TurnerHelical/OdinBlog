import {Form, useActionData, useNavigation} from 'react-router';
import {useFormValidation} from '../../hooks/useFormValidation'
import '../../styles/dashboard/dashCreate.css'

const validatePost = (values) => {
    const newErrors = {
        title: '',
        text: '',
    };

    if (!values.title.trim()) {
        newErrors.title = 'A Title is required';
    } else if (values.title.trim().length > 150) {
        newErrors.title = 'Title must be less than 150 characters';
    };

    if (!values.text.trim()) {
        newErrors.text = 'Post text is required'
    } else if (values.text.trim().length < 50) {
        newErrors.text = 'Post must be greater than 50 characters';
    } else if (values.text.trim().length > 20000) {
        newErrors.text = 'Post must be less than 20000 characters';
    };

    return newErrors;
}

const DashCreate = () => {
    const actionData = useActionData();
    const navigation = useNavigation();
    const postForm = useFormValidation({
        title: actionData?.values?.title ?? '', 
        text: actionData?.values?.text ?? ''},
        validatePost
    );

    const isSubmitting = navigation.state !== 'idle';
    const postServerError = actionData?.message;
    return (
        
            <Form id='postForm' action='/dash/create' method='post' onSubmit={postForm.handleSubmit}>
                <h2>Create Post Draft</h2>
                {postServerError && <p>{postServerError}</p>}
                <input 
                    name='title' 
                    id='title' 
                    placeholder='Title'
                    value={postForm.values.title}
                    onChange={postForm.handleChange}
                    onBlur={postForm.handleBlur}
                    />

                {postForm.touched.title && postForm.errors.title && (
                    <p>{postForm.errors.title}</p>
                )}

                <textarea 
                    name='text' 
                    id='text' 
                    placeholder='Write your post here....' 
                    value={postForm.values.text}
                    onChange={postForm.handleChange}
                    onBlur={postForm.handleBlur}
                    />
                {postForm.touched.text && postForm.errors.text && (
                    <p>{postForm.errors.text}</p>
                )}
                <button id= 'postSubmit'type='submit' disabled={isSubmitting} >{isSubmitting ? 'Creating...' : 'Submit'}</button> 
            </Form>
        
        
    )
}

export {DashCreate, validatePost};