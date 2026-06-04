import {useLoaderData, Link} from 'react-router';
import {Pagination} from '../layout/pagination';
import '../../styles/dashboard/dashPosts.css'

const DashDrafts = () => {
    const data = useLoaderData();
    return (
        <>
            <h2>My Drafts</h2>
            <div className='postCtrDash'>
                {data.items.length > 0 
                ?(data.items.map(post => (

                    <Link className='postCardDash' key={post.id} to={`/dash/editPost/${post.id}`}>
                        
                            <h3 className='postTitleDash'>{post.title}</h3>
                            <p className='editPostDash'>{new Date(post.createdAt).toLocaleDateString()}</p>
                        
                    </Link>
                )))
                :(<>
                    <p>No Drafts!</p>
                </>)
            }
            </div>
            <Pagination 
                currentPage={data.pageNumber}
                totalPages={data.pages}
                url='/dash/drafts' />
        
        </>
    )
}

export {DashDrafts};