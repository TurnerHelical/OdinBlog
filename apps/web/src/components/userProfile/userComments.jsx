import {useLoaderData, useRouteLoaderData, Link} from 'react-router';

const UserComments = () => {
    const comments = useLoaderData();
    const profileData = useRouteLoaderData('profileRoot');
    return (
        <>
            <div>
                <h2>{profileData.displayname}'s Comments</h2>
                {comments.length > 0 
                    ? (comments.map(comment => (
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
        </>
    )
}

export {UserComments};