import {useLoaderData, Form} from 'react-router';

const PostUpdate = () => {
    const data = useLoaderData();
    console.log(data);
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
                        <input type='radio' name='unpublish' value='false' id='unpublishFalse'></input>
                        <label htmlFor='publishFalse'>No</label>
                    </div>
                ) 
                :(
                    <div>
                        <p>Would you like to publish this blog post?</p>
                        <input type='radio' name='publish' value='true' id='publishTrue'></input>
                        <label htmlFor='publishTrue'>Yes</label>
                        <input type='radio' name='publish' value='false' id='publishFalse'></input>
                        <label htmlFor='publishFalse'>No</label>
                    </div>
                )}
                <input type='hidden' name='postId' value={data.id}></input>
                <button type='submit'>Submit</button>
            </Form>
        
        </>
    )
}

export {PostUpdate};