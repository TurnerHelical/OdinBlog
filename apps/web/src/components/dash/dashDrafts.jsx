import {useLoaderData, Link} from 'react-router';

const DashDrafts = () => {
    const data = useLoaderData();
    return (
        <>
            <h2>My Drafts</h2>
            <div>
                {data.length > 0 
                ?(data.map(post => (

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
        
        </>
    )
}

export {DashDrafts};