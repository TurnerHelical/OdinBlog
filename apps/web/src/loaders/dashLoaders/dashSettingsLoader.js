import { api } from '../../helpers/apiHelper';

async function settingsLoader() {
    try {
        const profile = await api({ url: '/users/myProfile', options: { method: 'GET' } });
        return profile;
    } catch (err) {

    }
}

export { settingsLoader };