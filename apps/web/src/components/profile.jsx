import {useLoaderData} from 'react-router';

const Profile = () => {
    const profile = useLoaderData();

    return (
        <>
        <h1>User {`${profile.user.displayname}`}</h1>
        </>
    )
}

export default Profile;