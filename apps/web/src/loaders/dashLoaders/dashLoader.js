import { api } from '../../helpers/apiHelper'

async function dashLoader() {
    try {
        const data = await api({ url: '/users/me' });
        const user = data.user;
        return user;
    } catch (error) {

    }
}

export { dashLoader };