import {Form} from 'react-router';
import {useRouteLoaderData} from 'react-router';

const Auth = () => {
    const rootData = useRouteLoaderData('root');
    const user = rootData.user;
    
    return (
        <>
            {user  ? (
                <Form action='/auth' method='post'>
                    <h2>Already logged in</h2>
                    
                    <button type='submit' name='intent' value='logout'>Logout?</button>
                </Form>
            ) : (
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
            )}
        </>
        
    )
};

export {Auth};

