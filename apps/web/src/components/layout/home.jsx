import '../../styles/home.css'
import {useLoaderData, useRouteLoaderData} from 'react-router';
 




const Home = () => {
    const posts = useLoaderData();
    
    return (
        <>
            <h2>This is my home page there will be blog posts here</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title} {post.user.displayname} {new Date(post.publishedAt).toLocaleDateString()}</li>
                ))}
            </ul>
            
        </>
    )
}

export default Home;