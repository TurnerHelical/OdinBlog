import { api } from '../../helpers/apiHelper';

async function myPostLoader() {
    try {
        const posts = await api({ url: '/posts/mine' });
        return posts
    } catch (error) {

    }
}

export { myPostLoader };