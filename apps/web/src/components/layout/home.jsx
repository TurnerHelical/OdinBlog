import '../../styles/home.css'
import {useLoaderData, Link} from 'react-router';
import {Pagination} from './pagination';
 




const Home = () => {
    const data = useLoaderData();
    
    return (
        <div className='content'>
            <h2 className='pageTitle'>Blog Posts</h2>
            <div className='cardContainer'>
                {data.items.map(post => (
                    <Link to={`blog/${post.id}`} key={post.id} className='postCard'>
                        <h3>{post.title}</h3>
                        <div>
                            <p className='posterName'>{post.user?.displayname ? post.user.displayname : 'User Deleted'}</p>
                            <p className='postDate'>{new Date(post.publishedAt).toLocaleDateString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
            
            <Pagination 
                currentPage={data.pageNumber}
                totalPages={data.pages}
                url='/'
                
                />
            
            
        </div>
    )
}

export default Home;