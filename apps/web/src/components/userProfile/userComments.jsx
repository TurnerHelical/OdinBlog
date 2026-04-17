import {useLoaderData, useRouteLoaderData, Link} from 'react-router';
import {Pagination} from '../layout/pagination';

const UserComments = () => {
    const data = useLoaderData();
    const profileData = useRouteLoaderData('profileRoot');
    return (
        <>
            <Link to={`/user/${profileData.id}`}>Back</Link>
            <div>
                <h2>{profileData.displayname}'s Comments</h2>
                {data.items.length > 0 
                    ? (data.items.map(comment => (
                        <Link to={`/blog/${comment.postId}`} key={comment.id}>
                            <p>{comment.previewText}</p>
                            <p>{comment.updatedAt ? new Date(comment.updatedAt).toLocaleDateString() : new Date(comment.createdAt).toLocaleDateString()}</p>
                        </Link>
                    )))
                    : (<div>
                        <p>No Comments Yet!</p>
                    </div>)
                }

            </div>
            <Pagination
                currentPage={data.pageNumber}
                totalPages={data.page}
                url={`/user/${profileData.id}/comments`} />
        </>
    )
}

export {UserComments};