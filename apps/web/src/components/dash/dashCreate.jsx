import {Form} from 'react-router';

const DashCreate = () => {
    
    return (
        <>
            <Form action='/dash/create' method='post'>
                <h2>Create Post Draft</h2>
                <input name='title' id='title' placeholder='Title'/>
                <input name='text' id='text' placeholder='Post Text'/>
                <button type='submit'>Create Draft</button> 
            </Form>
        
        </>
    )
}

export {DashCreate};