import {useLoaderData, Form} from 'react-router';
import {useState} from 'react';

const PostUpdate = () => {
    const data = useLoaderData();
    const [dangerZone, setDangerZone] = useState(false);
    return (
        <>
            <Form action={`/dash/editPost/${data.id}`} method='patch'>
                <input name='title' id='title' defaultValue={data.title}></input>
                <textarea rows='10' cols='75'name='text' id='text' defaultValue={data.text}></textarea>
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
                <button type='submit' name='intent' value='edit'>Submit</button>
            </Form>

            <button onClick={() => setDangerZone(previous => !previous)}>DANGER ZONE</button>
            {!dangerZone 
            ? ('')
            :(<Form action={`/dash/editPost/${data.id}`} method='delete'>
                <button type='submit' name='intent' value='delete'>Delete this post</button>
            </Form>)}
        
        </>
    )
}

export {PostUpdate};