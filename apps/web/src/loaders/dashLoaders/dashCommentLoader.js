import { api } from '../../helpers/apiHelper';

async function commentLoader() {
    try {
        const comments = await api({ url: '/comments/mine' });
        return comments
    } catch (error) {

    }
}

export { commentLoader };