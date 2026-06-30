import {useLoaderData, Link} from 'react-router';
import {Pagination} from '../layout/pagination';
import '../../styles/dashboard/dashPosts.css'

const DashPosts = () => {
    const data = useLoaderData();
    return (
        <>
            
                <h2>My Posts</h2>
                    <div className='postCtrDash'>
                        {data.items.length > 0 
                        ?(data.items.map(post => (
                            <div key={post.id} className='cardDash' >
                                
                                <Link className='titleDash postTitle' to={`/blog/${post.id}`}>{post.title}</Link>
                                <Link className='editPostDash' to={`/dash/editPost/${post.id}`}>Edit Post</Link>
                            </div>
                        )))
                        :(<>
                        <p>No Posts Yet!</p>
                        </>)
                        }
                    </div>
            <Pagination
                currentPage={data.pageNumber}
                totalPages={data.pages}
                url={`/dash/posts`} />
        </>
    )
}

export {DashPosts};