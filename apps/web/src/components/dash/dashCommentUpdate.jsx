import {Form, useLoaderData} from 'react-router';
import {useState} from 'react'
import '../../styles/dashboard/dashCommentEdit.css'

const UpdateComment = () => {
    const data = useLoaderData();
    const [dangerZone, setDangerZone] = useState(false);

    return (
        <>
            <Form action={`/dash/editComment/${data.id}`} method='patch' id='editForm'>
                <textarea name='commentText' id='commentText' defaultValue={data.text}></textarea>
                <div className='dates'>
                    <p>Created at: {new Date(data.createdAt).toLocaleDateString()}</p>
                    {!data.updatedAt
                    ? ('')
                    :(<p> Last updated at: {new Date(data.updatedAt).toLocaleDateString()}</p>)}
                </div>
                <button className='updateBtn' type='submit' name='intent' value='edit'>Update</button>   
                
                       
            </Form>
            <div id='dangerBox'>
                <button className='dangerBtn' onClick={() => setDangerZone(previous => !previous)}>DANGER ZONE</button>

                {!dangerZone 
                ? ('')
                :(
                <Form action={`/dash/editComment/${data.id}`} method='delete'>
                    <button type='submit' className='dangerBtn confirmDelete' name='intent' value='delete'>Delete Comment</button>
                </Form>)}
            </div>
        
        </>
    )
}

export {UpdateComment};