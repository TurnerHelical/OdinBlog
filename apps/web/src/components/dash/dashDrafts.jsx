import {useLoaderData, Link} from 'react-router';
import {Pagination} from '../layout/pagination';

const DashDrafts = () => {
    const data = useLoaderData();
    return (
        <>
            <h2>My Drafts</h2>
            <div>
                {data.items.length > 0 
                ?(data.items.map(post => (

                    <Link key={post.id} to={`/dash/editPost/${post.id}`}>
                        <div>
                            <h3>{post.title}</h3>
                            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
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