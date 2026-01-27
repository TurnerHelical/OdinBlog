import {useLoaderData} from 'react-router';

const Home = () => {
    const posts = useLoaderData();

    return (
        <>
            <h2>This is my home page there will be blog posts here</h2>
            <ul>
                {posts.map((b) => (
                <li key={b.id}>{b.title}</li>
                ))}
            </ul>
            <form action={'http://localhost:3001/auth/login'} method='POST'>
                <input type='text' name='email' id='email'></input>
                <input type='password' name='password' id='password'></input>
                <button type='submit'>Submit</button>
                
            
            </form>
        </>
    )
}

export default Home;