import '../../styles/home.css'
import {useLoaderData, Link} from 'react-router';
 




const Home = () => {
    const data = useLoaderData();

    const generatePageNumber = (currentPage, totalPages) => {
        const pageLinks= [];
        for (let i = 1; i <= totalPages; i++) {
            i === currentPage 
                ? (pageLinks.push(<p key={i}><strong>{`${i}`}</strong></p>))
                : (pageLinks.push(<Link key ={i} to={`/?page=${i}`}>{`${i}`}</Link>))
        }
        return pageLinks;
    }
    const pageLinkArray = generatePageNumber(data.pageNumber, data.pages)

    
    return (
        <>
            <h2>This is my home page there will be blog posts here</h2>
            <ul>
                {data.posts.map(post => (
                    <li key={post.id}><Link to={`blog/${post.id}`}>{post.title} {post.user?.displayname ? post.user.displayname : 'User Deleted'} {new Date(post.publishedAt).toLocaleDateString()}</Link></li>
                ))}
            </ul>
            <div>
                {data.pageNumber > 1 && (
                    <Link to={`/?page=${data.pageNumber - 1}`}>&lt;</Link>
                )}

                {pageLinkArray}
                    
                

                {data.pageNumber < data.pages && (
                    <Link to={`/?page=${data.pageNumber + 1}`}>&gt;</Link>
                )}                  
                
            </div>
            
        </>
    )
}

export default Home;