import { api } from '../../helpers/apiHelper';

async function adminPostsLoader() {
    try {
        const posts = await api({ url: '/posts' })
        return posts;
    } catch (error) {

    }
}

export { adminPostsLoader };