import {useLoaderData, Form} from 'react-router';
import {useState} from 'react'

const AdminUsers = () => {
    const users = useLoaderData();
    const [openDeleteUserId, setOpenDeleteUserId] = useState(null);
    const [openRequestUserId, setOpenRequestUserId] = useState(null);
    return (
        <>
            {users.map(user => (
                <div key={user.id}>
                    <ul>
                        <li>{user.displayname}</li>
                        <li>{user.email}</li>
                        <li>{user.isAdmin ? 'True' : 'False'}</li>
                        <li>{user.canPost ? 'True' : 'False'}</li>
                        <li>{user.hasRequested ? <button onClick={() => setOpenRequestUserId(previous => previous === user.id ? null : user.id)}>Request</button> : ''}</li>
                        {openRequestUserId === user.id && (
                            <>
                                <p>{user.postRequest}</p>
                                <Form method='post'>
                                    <input type='hidden' name='userId' value={user.id}/>
                                    <button type='submit' name='intent' value='approvePostAccess'>Approve Post Access</button>
                                </Form>
                                </>
                        )}
                        <li><button onClick={() => setOpenDeleteUserId(previous => previous === user.id ? null : user.id)}>Delete User</button></li>
                        {openDeleteUserId === user.id && (
                            <Form method='post'>
                                <input type='hidden' name='userId' value={user.id}/>
                                <button type='submit' name='intent' value='deleteUser'>Delete this user</button>
                            </Form>
                        )}
                            
                    </ul>
                </div>
            ))}
        </>

    )
}

export {AdminUsers};