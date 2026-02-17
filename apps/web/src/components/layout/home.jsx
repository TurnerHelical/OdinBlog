import '../../styles/home.css'
import {useLoaderData, Form, useOutletContext} from 'react-router';
import Modal from '../structure/modal.jsx';
import { useModal } from '../../hooks/useModal.js';


const Home = () => {
    const posts = useLoaderData();
    const modal = useModal();
    return (
        <>
            <h2>This is my home page there will be blog posts here</h2>
            <ul>
                {posts.map((b) => (
                <li key={b.id}>{b.title}</li>
                ))}
            </ul>
            <button onClick={modal.show}>Login/Register</button>

            <Modal open={modal.open} onClose={modal.hide} title='Account'>
            <Form method='post'>
                <h2>Login</h2>
                <input type='text' name='email' id='loginEmail'></input>
                <input type='password' name='password' id='loginPassword'></input>
                <button type='submit' name='intent' value='login'>Submit</button>
                
            </Form>

            <Form method='post'>
                <h2>Register</h2>
                <input type='text' name='email' id='regEmail'></input>
                <input type='password' name='password' id='regPassword'></input>
                <input type='password' name='confirmPassword' id='regConfirm'></input>
                <input type='text' name='displayname' id='displayname'></input>

                <button type='submit' name='intent' value='register'>Submit</button>

            </Form>
            </Modal>
        </>
    )
}

export default Home;