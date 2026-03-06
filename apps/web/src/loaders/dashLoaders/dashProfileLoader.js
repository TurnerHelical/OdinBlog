import { api } from '../../helpers/apiHelper';

async function dashProfileLoader() {
    try {
        const profileData = await api({ url: `/users/myProfile` });
        return profileData;
    } catch (err) {

    }

}

export { dashProfileLoader };