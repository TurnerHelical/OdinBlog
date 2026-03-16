import {Form, useLoaderData, useRouteLoaderData} from 'react-router';

const UpdateComment = () => {
    const data = useLoaderData();

    return (
        <>
            <Form action={`/dash/editComment/${data.id}`} method='patch'>
                <input name='commentText' id='commentText' defaultValue={data.text}></input>
                <p>Created at: {new Date(data.createdAt).toLocaleDateString()}</p>

                <button type='submit'>Update</button>          
            </Form>
        
        </>
    )
}

export {UpdateComment};