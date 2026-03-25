import { api } from '../helpers/apiHelper';

async function userPostLoader({ params }) {
    try {
        const userId = params.userId;
        const posts = await api({ url: `/users/${userId}/posts` });
        return posts;
    } catch (error) {

    }
}

export { userPostLoader };