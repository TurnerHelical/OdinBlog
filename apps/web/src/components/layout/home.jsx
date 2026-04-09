import '../../styles/home.css'
import {useLoaderData, Link} from 'react-router';
 




const Home = () => {
    const posts = useLoaderData();
    
    return (
        <>
            <h2>This is my home page there will be blog posts here</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}><Link to={`blog/${post.id}`}>{post.title} {post.user?.displayname ? post.user.displayname : 'User Deleted'} {new Date(post.publishedAt).toLocaleDateString()}</Link></li>
                ))}
            </ul>
            
        </>
    )
}

export default Home;