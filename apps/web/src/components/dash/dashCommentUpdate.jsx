import {Form, useLoaderData} from 'react-router';
import {useState} from 'react'

const UpdateComment = () => {
    const data = useLoaderData();
    const [dangerZone, setDangerZone] = useState(false);

    return (
        <>
            <Form action={`/dash/editComment/${data.id}`} method='patch'>
                <input name='commentText' id='commentText' defaultValue={data.text}></input>
                <p>Created at: {new Date(data.createdAt).toLocaleDateString()}</p>

                <button type='submit' name='intent' value='edit'>Update</button>          
            </Form>

            <button onClick={() => setDangerZone(previous => !previous)}>DANGER ZONE</button>

            {!dangerZone 
            ? ('')
            :(
            <Form action={`/dash/editComment/${data.id}`} method='delete'>
                <button type='submit' name='intent' value='delete'>Delete Comment</button>
            </Form>)}
        
        </>
    )
}

export {UpdateComment};