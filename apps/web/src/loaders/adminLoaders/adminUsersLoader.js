import { api } from '../../helpers/apiHelper';

async function adminUsersLoader() {
    try {
        const users = await api({ url: '/users' });
        return users;
    } catch (error) {

    }
}

export { adminUsersLoader };