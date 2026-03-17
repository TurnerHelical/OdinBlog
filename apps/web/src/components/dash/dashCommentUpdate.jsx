import {Form, useLoaderData} from 'react-router';

const UpdateComment = () => {
    const data = useLoaderData();

    return (
        <>
            <Form action={`/dash/editComment/${data.id}`} method='patch'>
                <input name='commentText' id='commentText' defaultValue={data.text}></input>
                <p>Created at: {new Date(data.createdAt).toLocaleDateString()}</p>

                <button type='submit' name='intent' value='edit'>Update</button>          
            </Form>

            <Form action={`/dash/editComment/${data.id}`} method='delete'>
                <button type='submit' name='intent' value='delete'>Delete Comment</button>
            </Form>
        
        </>
    )
}

export {UpdateComment};