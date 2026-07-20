import {Form, useLoaderData, useNavigation} from 'react-router';
import {useState, useRef, useEffect} from 'react';
import '../../styles/dashboard/dashSettings.css'

const DashSettings = () => {
    const {profile} = useLoaderData();
    const navigation = useNavigation();
    const [dangerZone, setDangerZone] = useState(false);
    const [requestPostAccess, setRequestPostAccess] = useState(false);
    const [confirmModal, setconfirmModal] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updateData, setUpdateData] = useState({bio: profile.bio, displayname: profile.displayname});
    const submitted = useRef(false);

    useEffect(() => {
        if (navigation.state === 'submitting') {
            submitted.current = true;
        }

        if (submitted.current && navigation.state === 'idle') {
            setUpdateData({bio: profile.bio, displayname: profile.displayname});
            submitted.current = false;
        }
    },[navigation.state]);
    

    return (
        <>
            <div className='btnCtr'>
                <button className='settingsBtn'onClick={() => setUpdateProfile(previous => !previous)}>Edit User Profile</button>
            {!updateProfile 
                ? ('')
                :(
                    <Form action='/dash/settings' method='post' className='settingsForm'>
                        <label>Edit Bio:</label>
                        <textarea name='bio' id='bio'  value={updateData.bio} onChange={(e) => setUpdateData({...updateData, bio: e.target.value})}/>
                        <label>Edit Display Name:</label>
                        <input name='displayname'  value={updateData.displayname} onChange={(e) => setUpdateData({...updateData, displayname: e.target.value})} />
                        <button className='settingsBtn confirmBtn' type='submit' name='intent' value='updateProfile'>{navigation.state === 'submitting' ? 'Updating.....' : 'Update Profile'}</button>
                    </Form>

                )
            }

            <button className='settingsBtn' onClick={() => setRequestPostAccess(previous => !previous)}>Request Post Access</button>
            {!requestPostAccess 
                ? ('')
                :(
                    <Form action='/dash/settings' method='post' className='settingsForm'>
                        <label>Send a message to an admin explaining why you need post access:</label>
                        <textarea name='postRequest' id='postRequest'/>
                        <button className='settingsBtn confirmBtn' name='intent' value='requestPost'>Request Access</button>
                    </Form>
                )  
            }

            <button className='dangerBtn' onClick={() => setDangerZone(previous => !previous)}>DANGER ZONE</button>
            
                {!dangerZone
                ? ('')
                : (
                    <div className='dangerZone'>
                        <button className='dangerBtn deleteBtn' onClick={() => setconfirmModal(previous => !previous)}>Delete Account</button>
                        {!confirmModal 
                ? ('') 
                : (
                    <div className='dangerZone'>
                        <p>Are you sure you want to delete your account? There is no recovering it.</p>
                        <Form action='/dash/settings' method='delete'>
                            <button className='dangerBtn confirmDelete' type='submit' name='intent' value='deleteAccount' disabled={navigation.state !== 'idle'}>Confirm</button>
                        </Form>
                    </div>
                )    
            }
                    </div>
                )
            }

            

            
            
            </div>
            
        </>
    )
}

export {DashSettings};