import {Form, Link, useLoaderData, useNavigation} from 'react-router';
import {useState, useRef, useEffect} from 'react';

const DashSettings = () => {
    const {profile} = useLoaderData();
    const navigation = useNavigation();
    const [dangerZone, setDangerZone] = useState(false);
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
            <button onClick={() => setUpdateProfile(previous => !previous)}>Edit User Profile</button>
            {!updateProfile 
                ? ('')
                :(
                    <Form>
                        <textarea name='bio' id='bio'  value={updateData.bio} onChange={(e) => setUpdateData({...updateData, bio: e.target.value})}/>
                        <input name='displayname'  value={updateData.displayname} onChange={(e) => setUpdateData({...updateData, displayname: e.target.value})} />
                        <button type='submit' name='intent' value='updateProfile'>{navigation.state === 'submitting' ? 'Updating.....' : 'Update Profile'}</button>
                    </Form>

                )
            }

            <button onClick={() => setDangerZone(previous => !previous)}>DANGER ZONE</button>

            {!dangerZone
                ? ('')
                : (
                    
                    <button onClick={() => setconfirmModal(previous => !previous)}>Delete Account</button>
                    
                )
            }

            {!confirmModal 
                ? ('') 
                : (
                    <div>
                        <p>Are you sure you want to delete your account? There is no recovering it.</p>
                        <Form action='/dash/settings' method='delete'>
                            <button type='submit' name='intent' value='deleteAccount' disabled={navigation.state !== 'idle'}>Confirm</button>
                        </Form>
                    </div>
                )    
            }
        </>
    )
}

export {DashSettings};