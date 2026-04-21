import {Form, useRouteLoaderData} from 'react-router';
import {useFormValidation} from '../../hooks/useFormValidation';


const validateLogin = (values) => {
        const newErrors = {email: '', password:''}

        if (!values.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!values.password.trim()) {
            newErrors.password = 'Password is required'
        }

        return newErrors;
    }

    const validateRegister = (values) => {
        const newErrors = {
            displayname: '',
            email: '',
            password: '',
            confirmPassword: '',    
        };

        if (!values.displayname.trim()) {
            newErrors.displayname = 'Please enter a username';
        }
        if (!values.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!values.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!values.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Both password fields are required';
        } else if (values.confirmPassword !== values.password) {
            newErrors.confirmPassword = 'Password do not match';
        }

        return newErrors;
    }

const Auth = () => {
    const rootData = useRouteLoaderData('root');
    const user = rootData.user;
    
    const loginForm = useFormValidation(
        {email: '', password: ''},
        validateLogin
    );

    const registerForm = useFormValidation(
        {
            displayname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validateRegister
    );
    
    
    
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
                <Form action='/auth' method='post' onSubmit={loginForm.handleSubmit}>
                <div> 
                    <input 
                        name='email' 
                        id='loginEmail' 
                        value={loginForm.values.email} 
                        onChange={loginForm.handleChange} 
                        onBlur={loginForm.handleBlur} 
                        type='email' 
                        placeholder='Email'
                    />
                    {loginForm.touched.email && loginForm.errors.email && (
                        <p>{loginForm.errors.email}</p>
                    )}
                </div>

                <div>
                    <input 
                        name='password' 
                        id='loginPassword' 
                        value={loginForm.values.password} 
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur} 
                        type='password'
                        placeholder='Password'
                        />
                        {loginForm.touched.password && loginForm.errors.password && (
                            <p>{loginForm.errors.password}</p>
                        )}
                </div>
                    <button type='submit' name='intent' value='login'>Submit</button>
                
                </Form>
            </div>

            <div>
                <Form action='/auth' method='post' onSubmit={registerForm.handleSubmit}>
                    <input 
                        name='displayname' 
                        id='displayname'
                        value={registerForm.values.displayname}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        placeholder='Username'
                        type='text'/>
                        {registerForm.touched.displayname && registerForm.errors.displayname && (
                        <p>{registerForm.errors.displayname}</p>
                        )}
                    <input 
                        name='email' 
                        id='registerEmail' 
                        placeholder='Email Address' 
                        type='email'
                        value={registerForm.values.email}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        />
                        {registerForm.touched.email && registerForm.errors.email && (
                        <p>{registerForm.errors.email}</p>
                        )}
                    <input 
                        name='password' 
                        id='registerPassword' 
                        placeholder='Password' 
                        type='password'
                        value={registerForm.values.password}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        />
                        {registerForm.touched.password && registerForm.errors.password && (
                        <p>{registerForm.errors.password}</p>
                        )}
                    <input 
                        name='confirmPassword' 
                        id='confirmPassword' 
                        placeholder='Confirm Password' 
                        type='password'
                        value={registerForm.values.confirmPassword}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        />
                        {registerForm.touched.confirmPassword && registerForm.errors.confirmPassword && (
                        <p>{registerForm.errors.confirmPassword}</p>
                        )}
                    <button type='submit' name='intent' value='register'>Submit</button>
                </Form>
            </div>
            </>
            )}
        </>
        
    )
};

export {Auth};

