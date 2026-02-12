import {useLoaderData} from 'react-router';

const Profile = () => {
    const {profile, isMe} = useLoaderData();

    return (
        <>
        <h1>User {`${profile.displayname}`}</h1>
        {isMe ? (
            <>
                <button>Edit Profile</button>
                <button>View public profile</button>
            </>
        ): (<>
        </>)}
            <main>
                <div>
                    <h2>About Me</h2>
                    {`${profile.bio}`}
                </div>

                <div>
                    <h2>Posts by {`${profile.displayname}`}</h2>

                </div>
            </main>
        </>
    )
}

export default Profile;