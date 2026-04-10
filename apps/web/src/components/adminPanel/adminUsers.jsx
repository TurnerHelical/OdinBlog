import {useLoaderData, Form} from 'react-router';

const AdminUsers = () => {
    const users = useLoaderData();
    return (
        <>
            {users.map(user => (
                <div key={user.id}>
                    <ul>
                        <li>{user.displayname}</li>
                        <li>{user.email}</li>
                        <li>{user.isAdmin ? 'True' : 'False'}</li>
                        <li>{user.canPost ? 'True' : 'False'}</li>
                        <li>This will be an indication that this user has requested posting access and will be a link to the request from the user</li>
                        <li><Form method='delete'>
                                <input type='hidden' name='userId' value={user.id}/>
                                <button type='submit' name='intent' value='deleteUser'>Delete this user</button>
                            </Form></li>
                    </ul>
                </div>
            ))}
        </>

    )
}

export {AdminUsers};