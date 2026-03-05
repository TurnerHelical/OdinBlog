import { api } from '../helpers/apiHelper'

async function dashLoader() {
    try {
        const data = await api({ url: '/users/me' });
        const user = data.user;
        const profileData = await api({ url: `/users/${user.id}` })
        return profileData;
    } catch (error) {

    }
}

export { dashLoader };