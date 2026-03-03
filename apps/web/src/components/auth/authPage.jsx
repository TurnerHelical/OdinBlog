import {Form} from 'react-router';

const Auth = () => {
    return (
        <>
        <div>
            <Form action='/auth' method='post'>
                <input name='email' id='loginEmail' placeholder='Email Address' type='email'/>
                <input name='password' id='loginPassword' placeholder='Password' type='password'/>
                <button type='submit' name='intent' value='login'>Submit</button>
            </Form>
        </div>

        <div>
            <Form action='/auth' method='post'>
                <input name='displayname' id='displayname' placeholder='Username' type='text'/>
                <input name='email' id='registerEmail' placeholder='Email Address' type='email'/>
                <input name='password' id='registerPassword' placeholder='Password' type='password'/>
                <input name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' type='password'/>
                <button type='submit' name='intent' value='register'>Submit</button>
            </Form>
        </div>
    </>
    )
};

export {Auth};

