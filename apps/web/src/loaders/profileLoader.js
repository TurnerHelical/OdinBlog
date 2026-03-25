import { api } from '../helpers/apiHelper';

async function profileLoader({ params }) {
    try {
        const userId = params.userId;
        const user = await api({ url: `/users/${userId}` })
        return user;
    } catch (error) {

    }
}

export { profileLoader };